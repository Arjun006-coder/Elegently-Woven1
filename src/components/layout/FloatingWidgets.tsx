import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, MessageCircle, X, Send, Headphones, Sparkles, User } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { askGeminiShopkeeper } from "@/lib/gemini";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);
  const [chat, setChat] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! 🙏 Welcome to ElegantlyWoven. Tell me your occasion, favorite colors, or budget, and I'll recommend the perfect drape for you!",
      time: "Just now",
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
  }, [messages, chat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const userMsgObj: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setInputMsg("");

    // Fetch AI Indian Shopkeeper Response from Gemini API (with Product Catalog Context)
    try {
      const botReply = await askGeminiShopkeeper(userText, messages);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "Namasteji! AAP bilkul tension mat lijiye. Explore our fine silk collections or speak with our weavers on WhatsApp!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {chat ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="pointer-events-auto w-[20rem] sm:w-[22rem] overflow-hidden rounded-2xl border border-gold/30 bg-card/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-gold/20 text-gold">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase">Saree Stylist AI</p>
                  <p className="text-[10px] text-primary-foreground/80 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChat(false)}
                aria-label="Close chat"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-[18rem] overflow-y-auto space-y-3 p-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.sender === "bot" && (
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/10 text-gold mt-1">
                      <Sparkles className="h-3 w-3" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-xs"
                        : "bg-secondary text-secondary-foreground border border-border/60 rounded-bl-xs"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p className={`mt-1 text-[9px] text-right ${m.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {m.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 border-t border-border bg-background/50 px-3 py-2.5"
            >
              <Input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask about sarees, prices, drapes..."
                className="h-9 text-xs rounded-full bg-background"
                aria-label="Message"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-card border border-border shadow-soft hover:bg-secondary transition-colors"
          >
            <ArrowUp className="h-4 w-4 text-foreground" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <a
        href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-lift transition-transform hover:scale-105"
        title="WhatsApp Live Support"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <button
        type="button"
        onClick={() => setChat((c) => !c)}
        aria-label="Open live chat"
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
        title="Live Saree Stylist"
      >
        <Headphones className="h-5 w-5" />
      </button>
    </div>
  );
}