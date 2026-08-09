import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, MessageCircle, X, Send, Headphones } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Input } from "@/components/ui/input";

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);
  const [chat, setChat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {chat ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="pointer-events-auto w-[19rem] overflow-hidden rounded-2xl glass shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <p className="flex items-center gap-2 text-sm">
                <Headphones className="h-4 w-4 text-gold" /> Saree stylist
              </p>
              <button type="button" onClick={() => setChat(false)} aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 px-4 py-4 text-sm">
              <p className="rounded-2xl rounded-bl-sm bg-secondary px-3 py-2">
                Namaste! Tell us the occasion and budget — we'll shortlist three drapes for you.
              </p>
              <p className="text-[11px] text-muted-foreground">Typically replies in 2 minutes</p>
            </div>
            <form
              className="flex items-center gap-2 border-t border-border/60 px-3 py-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input placeholder="Type a message" className="h-9 rounded-full" aria-label="Message" />
              <button type="submit" aria-label="Send" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
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
        aria-label="Open live chat"
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        <Headphones className="h-5 w-5" />
      </button>
    </div>
  );
}