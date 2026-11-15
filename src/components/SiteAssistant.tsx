import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { askSiteAssistant } from "@/integrations/supabase/siteAssistant";
import type { AssistantInputMessage } from "@/integrations/supabase/siteAssistant";
import { businessInfo } from "@/data/serviceCatalog";

interface Recommendation {
  id: string;
  name: string;
  price: string;
  route: string;
  pageTitle: string;
  bookingUrl: string | null;
}

interface ChatMessage extends AssistantInputMessage {
  recommendations?: Recommendation[];
  fallbackLink?: string;
}

const greeting: ChatMessage = {
  role: "assistant",
  content: "Привет! Я Никита — AI-помощник Новобьюти. Расскажи, что ты хочешь сделать, и я помогу выбрать подходящую услугу или категорию. Можешь спросить о процедурах, ценах и записи.",
};

const quickPrompts = ["Подобрать услугу", "Узнать цены", "Как записаться?"];

const SiteAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isSending]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isSending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const result = await askSiteAssistant(
        nextMessages
          .filter((message) => message.role === "user" || message.role === "assistant")
          .slice(-14)
          .map(({ role, content: messageContent }) => ({ role, content: messageContent })),
      );

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: result.reply,
          recommendations: result.recommendations ?? [],
        },
      ]);
    } catch (error) {
      console.error("Site assistant request failed:", error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Сейчас не получилось подключиться к помощнику. Вы можете написать администратору — он подскажет по услугам и записи.",
          fallbackLink: businessInfo.telegram,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const resetChat = () => {
    setMessages([greeting]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Чат с Никитой — AI-помощником Новобьюти"
          className="flex h-[min(72vh,640px)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border/70 bg-background shadow-2xl"
          role="dialog"
          aria-modal="false"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 bg-gradient-to-r from-primary/15 via-background to-accent/60 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-heading text-lg font-semibold text-foreground">Никита — AI-помощник</h2>
                <p className="text-xs text-muted-foreground">Новобьюти · помогу выбрать услугу</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-background/70 hover:text-foreground"
                aria-label="Начать новый разговор"
                title="Начать новый разговор"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-background/70 hover:text-foreground"
                aria-label="Закрыть чат"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[88%] space-y-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-secondary/70 text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.recommendations?.map((service) => (
                    <article key={service.id} className="w-full rounded-2xl border border-primary/20 bg-card p-4 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{service.pageTitle}</p>
                      <h3 className="mt-1 font-heading text-base font-semibold text-foreground">{service.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-primary">{service.price}</p>
                      {service.bookingUrl ? (
                        <a
                          href={service.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          Записаться в DIKIDI
                        </a>
                      ) : (
                        <Link
                          to={service.route}
                          onClick={() => setIsOpen(false)}
                          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          Посмотреть услугу
                        </Link>
                      )}
                    </article>
                  ))}

                  {message.fallbackLink && (
                    <a
                      href={message.fallbackLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5"
                    >
                      Написать в Telegram
                    </a>
                  )}

                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pl-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    disabled={isSending}
                    className="rounded-full border border-primary/20 bg-background px-3 py-2 text-xs text-foreground transition-colors hover:bg-primary/10 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Подбираю ответ…
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="shrink-0 border-t border-border/60 bg-background px-4 pb-3 pt-3">
            <form onSubmit={onSubmit} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="site-assistant-message">Ваш вопрос</label>
              <textarea
                id="site-assistant-message"
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 800))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
                placeholder="Напишите, что вас интересует…"
                rows={1}
                className="max-h-28 min-h-11 flex-1 resize-y rounded-2xl border border-input bg-secondary/30 px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Отправить сообщение"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] leading-snug text-muted-foreground">
              Ответы могут использовать открытые веб-источники. Не отправляйте медицинские и платёжные данные.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Закрыть чат" : "Открыть помощника Никиту"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary p-0 text-sm font-medium text-primary-foreground shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default SiteAssistant;
