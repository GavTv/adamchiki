import { createClient } from "@supabase/supabase-js";

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

    if (attempt === 1 || !isTransientFunctionError(error)) throw error;
    await new Promise((resolve) => window.setTimeout(resolve, 600));
  }

  throw new Error("Assistant request failed");
}
