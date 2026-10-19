import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CapacityToast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-[9999] flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[350px]"
        >
          <div className="bg-white/20 p-2 rounded-lg">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black uppercase tracking-tight">Capacity Warning</h4>
            <p className="text-xs opacity-90 font-medium">{message}</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-md transition-colors">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}