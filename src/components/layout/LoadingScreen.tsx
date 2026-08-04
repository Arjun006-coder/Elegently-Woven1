import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BRAND } from "@/lib/data";

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 12, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl"
            >
              {BRAND.name}
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "9rem" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="mx-auto mt-5 h-px bg-gold"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="eyebrow mt-5"
            >
              Handloom Atelier
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}