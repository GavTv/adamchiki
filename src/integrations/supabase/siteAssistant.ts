import { createClient } from "@supabase/supabase-js";

export interface AssistantInputMessage {
  role: "user" | "assistant";
  content: string;
}

export async function askSiteAssistant(messages: AssistantInputMessage[]) {
  // Keep local assistant conversations on the local Supabase Functions runtime.
  // Production continues to use the configured Supabase project URL.
  const url = import.meta.env.DEV
    ? "http://127.0.0.1:54321"
    : import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Помощник пока не подключён к серверу.");
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.functions.invoke("site-assistant", {
    body: { messages },
  });

  if (error) throw error;
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
