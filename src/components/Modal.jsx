import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

export default function Modal({ open, onClose, title, children, isActive, onFocus }) {
  const isTouch = typeof window !== "undefined"
    && window.matchMedia("(pointer: coarse)").matches;

  return (
    <AnimatePresence>
      {open && (
        <div className="modal-container">
          <motion.div
            className={`modal-window ${isActive ? "active" : ""}`}
            onPointerDown={onFocus}
            drag={!isTouch}
            dragMomentum={false}
            dragElastic={0.08}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 32 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 34,
              mass: 0.6
            }}
          >
            <div className="window-bar modal-bar">
              <span>{title}</span>
              <button
                onPointerDown={e => e.stopPropagation()}
                onClick={onClose}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">{children}</div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
