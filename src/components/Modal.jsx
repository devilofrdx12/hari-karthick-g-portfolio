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
            drag
            dragMomentum={false}
            dragElastic={0}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 32 }}
            transition={
              isTouch
                ? { type: "spring", stiffness: 420, damping: 40, mass: 0.65 }
                : { type: "spring", stiffness: 420, damping: 34, mass: 0.65 }
            }
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
