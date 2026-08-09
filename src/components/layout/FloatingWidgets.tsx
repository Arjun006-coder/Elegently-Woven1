import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, MessageCircle, X, Send, Headphones, Sparkles, RefreshCw, Bot } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { askGeminiStylist, type ChatMessage } from "@/lib/gemini";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const quickPrompts = [
  "👰 Wedding saree under ₹25,000",
  "🥻 Best Kanjivaram for reception",
  "📦 What is the delivery time?",
  "✨ Silk Mark certification",
];

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);
  const [chat, setChat] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Namaste! I am Ananya, your AI Saree Stylist & Concierge at ElegantlyWoven. Tell me your occasion, colour, or budget — I'll find your perfect drape!",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (chat) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chat, loading]);

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const newMsg: ChatMessage = { role: "user", text: userText.trim() };
    const updatedHistory = [...messages, newMsg];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    const botReply = await askGeminiStylist(updatedHistory, userText.trim(), GEMINI_KEY);

    setMessages((prev) => [...prev, { role: "model", text: botReply }]);
    setLoading(false);
  };

  const handleReset = () => {
    setMessages([
      {
        role: "model",
        text: "Namaste! How may I assist you with your saree selection today?",
      },
    ]);
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {chat ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="pointer-events-auto w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl flex flex-col h-[30rem]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-primary text-primary-foreground px-4 py-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gold/20 text-gold">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-serif font-semibold leading-none">Ananya · AI Stylist</p>
                  <p className="text-[10px] text-primary-foreground/75 mt-0.5">ElegantlyWoven Luxury Concierge</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset conversation"
                  className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10 text-primary-foreground/80 transition-colors"
                  title="Reset Chat"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setChat(false)}
                  aria-label="Close chat"
                  className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10 text-primary-foreground/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-secondary/40 border-b border-border/50 shrink-0 text-xs no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap rounded-full bg-background border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:border-gold hover:text-foreground transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "model" && (
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 leading-relaxed max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none font-sans"
                        : "bg-secondary/70 text-foreground border border-border/50 rounded-tl-none font-serif text-[13px]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs py-1">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <span className="italic text-[11px]">Ananya is curating drapes for you...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              className="flex items-center gap-2 border-t border-border/70 p-3 bg-background shrink-0"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Ananya about sarees, occasion, budget..."
                className="h-9 rounded-full text-xs"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-opacity shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full glass shadow-soft"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <a
        href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-jade text-jade-foreground shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <button
        type="button"
        onClick={() => setChat((c) => !c)}
        aria-label="Open AI Saree Stylist"
        className="pointer-events-auto relative grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        <Headphones className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-black">
          AI
        </span>
      </button>
    </div>
  );
}