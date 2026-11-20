import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/react";
import { assistantCatalog, DIKIDI_BOOKING_URL } from "@/data/serviceCatalog";

export interface AssistantInputMessage {
  role: "user" | "assistant";
  content: string;
}

const isTransientFunctionError = (error: { name?: string; context?: unknown }) => {
  if (error.name === "FunctionsFetchError" || error.name === "FunctionsRelayError") return true;
  if (error.name !== "FunctionsHttpError") return false;

  const status = (error.context as { status?: unknown } | undefined)?.status;
  return typeof status === "number" && (status === 429 || status >= 500);
};

function reportAssistantFailure(error: { name?: string; context?: unknown }, outcome: "retrying" | "fallback") {
  if (!import.meta.env.VITE_SENTRY_DSN) return;
  const status = (error.context as { status?: unknown } | undefined)?.status;
  Sentry.captureException(new Error("Site assistant request failed"), {
    level: outcome === "fallback" ? "error" : "warning",
    tags: { feature: "site-assistant", outcome, source: error.name ?? "unknown" },
    extra: { httpStatus: typeof status === "number" ? status : undefined },
  });
}

const recommendationFor = (...ids: string[]) => ids.flatMap((id) => {
  const service = assistantCatalog.find((item) => item.id === id);
  return service ? [{
    id: service.id,
    name: service.name,
    price: service.price,
    route: service.route,
    pageTitle: service.pageTitle,
    bookingUrl: service.bookingUrl ?? null,
  }] : [];
});

const isExplicitCategoryQuery = (query: string) =>
  /педик|маник|гель.?лак|ногт|соляр|загар|абонемент|бров|ресниц|lpg|лпг|массаж|кавитац|миостимуляц|smas|окраш|окрас|покрас|цвет.{0,12}волос|колор|мелир|блонд|тонир|косметолог|лиц|чистк|пилинг|эпиляц/iu.test(query);

const recommendationForPattern = (pattern: RegExp, limit = 3) =>
  assistantCatalog.filter((service) => pattern.test(service.name)).slice(0, limit).map((service) => ({
    id: service.id,
    name: service.name,
    price: service.price,
    route: service.route,
    pageTitle: service.pageTitle,
    bookingUrl: service.bookingUrl ?? null,
  }));

const localFallbackForCategory = (query: string) => {
  const categories: Array<{ pattern: RegExp; services: RegExp; label: string }> = [
    { pattern: /педик/iu, services: /педик/iu, label: "Педикюр" },
    { pattern: /маник|гель.?лак|ногт/iu, services: /маник|ногт|гель.?лак|френч|дизайн/iu, label: "Маникюр и услуги для ногтей" },
    { pattern: /бров|ресниц/iu, services: /бров|ресниц/iu, label: "Услуги для бровей и ресниц" },
    { pattern: /lpg|лпг/iu, services: /lpg/iu, label: "LPG-массаж" },
    { pattern: /кавитац|миостимуляц|rf|smas|смас/iu, services: /кавитац|миостимуляц|rf|smas/iu, label: "Аппаратные процедуры" },
    { pattern: /массаж/iu, services: /массаж|банки/iu, label: "Массаж" },
    { pattern: /окраш|окрас|покрас|цвет.{0,12}волос|колор|мелир|блонд|тонир/iu, services: /окраш|тонир|мелир|блонд|контуринг/iu, label: "Окрашивание волос" },
    { pattern: /косметолог|лиц|чистк|пилинг|эпиляц|депиляц|карбокс/iu, services: /лиц|чистк|пилинг|депиляц|карбокс|уход для лица/iu, label: "Косметология и депиляция" },
  ];
  const category = categories.find(({ pattern }) => pattern.test(query));
  if (!category) return null;
  const recommendations = recommendationForPattern(category.services, 4);
  return recommendations.length ? {
    reply: `${category.label}: показываю услуги и актуальные цены из каталога DIKIDI.`,
    recommendations,
  } : null;
};
function buildLocalFallback(messages: AssistantInputMessage[]) {
  const context = messages.slice(-6).map(({ content }) => content.toLowerCase()).join(" ");
  const latestQuery = [...messages].reverse().find(({ role }) => role === "user")?.content.toLowerCase() ?? "";

  // Always honor a clearly stated current service before consulting earlier chat turns.
  const categoryFallback = localFallbackForCategory(latestQuery);
  if (categoryFallback) return categoryFallback;

  const currentHaircutIntent = /стриж|каре|подстричь/iu.test(latestQuery);
  const haircutIntent = currentHaircutIntent || (!isExplicitCategoryQuery(latestQuery) && /стриж|каре|подстричь/iu.test(context));
  if (haircutIntent && /реб[её]н|детск|сын|доч|малыш/iu.test(latestQuery)) {
    const recommendations = recommendationForPattern(/детская стрижка/iu, 2);
    return recommendations.length
      ? { reply: "В каталоге есть детская стрижка. Актуальная цена и длительность указаны в карточке ниже.", recommendations }
      : { reply: "Детская стрижка сейчас не указана в каталоге онлайн-записи. Уточнить у администратора можно по телефону +7 (985) 053-47-61.", recommendations: [] };
  }

  if (haircutIntent) {
    const wantsMen = /муж|мужчин|мужа|брата|отца|папу|парня/iu.test(latestQuery) || /муж|мужчин|мужа|брата|отца|папу|парня/iu.test(context);
    const wantsWomen = /жен|сест|девуш|жену|маму|доч/iu.test(latestQuery) || /жен|сест|девуш|жену|маму|доч/iu.test(context);
    if (wantsMen && !wantsWomen) {
      const recommendations = recommendationForPattern(/мужская стрижка/iu, 3);
      return { reply: "Вот актуальные варианты мужских стрижек из каталога DIKIDI:", recommendations };
    }
    if (wantsWomen && !wantsMen) {
      const recommendations = recommendationForPattern(/женская стрижка/iu, 3);
      return { reply: "Вот актуальные варианты женских стрижек из каталога DIKIDI:", recommendations };
    }
    return {
      reply: "В каталоге есть мужские и женские стрижки. Уточните, пожалуйста, кому нужна стрижка — мужчине или женщине?",
      recommendations: [...recommendationForPattern(/мужская стрижка/iu, 2), ...recommendationForPattern(/женская стрижка/iu, 2)],
    };
  }

  return null;
}

export async function askSiteAssistant(messages: AssistantInputMessage[]) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Помощник пока не подключён к серверу.");
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const { data, error } = await supabase.functions.invoke("site-assistant", {
      body: { messages },
    });

    if (!error) {
      const result = data as {
        reply: string;
        recommendations: Array<{
          id: string;
          name: string;
          price: string;
          route: string;
          pageTitle: string;
          bookingUrl: string | null;
        }>;
      };
      return {
        ...result,
        recommendations: (result.recommendations ?? []).map((service) => ({
          ...service,
          bookingUrl: service.bookingUrl ?? DIKIDI_BOOKING_URL,
        })),
      };
    }

    if (attempt === 1 || !isTransientFunctionError(error)) {
      const transient = isTransientFunctionError(error);
      if (transient) reportAssistantFailure(error, "fallback");
      const fallback = transient ? buildLocalFallback(messages) : null;
      if (fallback) return fallback;
      throw error;
    }
    reportAssistantFailure(error, "retrying");
    await new Promise((resolve) => window.setTimeout(resolve, 600));
  }

  throw new Error("Assistant request failed");
}
