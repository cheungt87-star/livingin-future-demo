import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  visible?: boolean;
}

export function Toast({ message, visible = true }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center pt-4"
        >
          <div className="bg-charcoal text-white px-4 py-3 rounded-full text-sm font-medium shadow-subtle">
            ✓ {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
