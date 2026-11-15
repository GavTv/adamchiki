import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/react";
import { assistantCatalog } from "@/data/serviceCatalog";

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

const recommendationFor = (id: string) => {
  const service = assistantCatalog.find((item) => item.id === id);
  if (!service) return [];
  return [{
    id: service.id,
    name: service.name,
    price: service.price,
    route: service.route,
    pageTitle: service.pageTitle,
    bookingUrl: service.bookingUrl ?? null,
  }];
};

function buildLocalFallback(messages: AssistantInputMessage[]) {
  const context = messages.slice(-6).map(({ content }) => content.toLowerCase()).join(" ");
  const latestQuery = [...messages].reverse().find(({ role }) => role === "user")?.content.toLowerCase() ?? "";
  const haircutIntent = /стриж|каре|волос/iu.test(context);

  if (haircutIntent && /реб[её]н|детск|сын|доч|малыш/iu.test(latestQuery)) {
    return {
      reply: "Детской стрижки нет в онлайн-каталоге. Уточнить, принимает ли мастер детей, можно у администратора по телефону +7 (985) 053-47-61.",
      recommendations: [],
    };
  }

  if (haircutIntent) {
    const wantsMen = /муж|мужчин|мужа|брата|отца|папу|парня/iu.test(context);
    const wantsWomen = /жен|сест|девуш|жену|маму|доч/iu.test(context);
    if (wantsMen) {
      return {
        reply: "В каталоге есть мужская стрижка от 950 ₽. Точная стоимость зависит от формы и сложности; откройте карточку услуги, чтобы посмотреть детали.",
        recommendations: recommendationFor("haircut-1"),
      };
    }
    if (wantsWomen) {
      return {
        reply: /сест/iu.test(context) && /каре/iu.test(context)
          ? "Для сестры с каре подойдёт услуга «Женские стрижки» от 1400 ₽. Точная стоимость зависит от длины, густоты и сложности работы."
          : "Подойдёт услуга «Женские стрижки» от 1400 ₽. Точная стоимость зависит от длины, густоты и сложности работы.",
        recommendations: recommendationFor("haircut-2"),
      };
    }
    return {
      reply: "В каталоге есть мужские стрижки от 950 ₽ и женские от 1400 ₽. Уточните, пожалуйста, кому нужна стрижка — мужчине или женщине?",
      recommendations: [...recommendationFor("haircut-1"), ...recommendationFor("haircut-2")],
    };
  }

  const categoryFallbacks: Array<{ pattern: RegExp; serviceId: string; label: string }> = [
    { pattern: /соляр|загар|абонемент/iu, serviceId: "solarium-minute-1", label: "солярия" },
    { pattern: /маник|педик|ногт|гель.?лак/iu, serviceId: "manicure-1", label: "маникюра и педикюра" },
    { pattern: /бров|ресниц/iu, serviceId: "brows-1", label: "оформления бровей" },
    { pattern: /lpg|лпг|массаж|кавитац|миостимуляц/iu, serviceId: "lpg-1", label: "массажа и аппаратных процедур" },
    { pattern: /косметолог|лиц|чистк|пилинг|эпиляц|smas/iu, serviceId: "face-care-1", label: "косметологии" },
  ];
  const category = categoryFallbacks.find(({ pattern }) => pattern.test(context));
  if (category) {
    return {
      reply: `Я временно не смог получить ответ помощника, но могу показать раздел ${category.label} в каталоге сайта. Там указаны услуги и цены.`,
      recommendations: recommendationFor(category.serviceId),
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
      return data as {
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
