import { motion, AnimatePresence, useDragControls } from "framer-motion";
import "./Modal.css";

export default function Modal({ open, onClose, title, children, isActive, onFocus }) {
  const isTouch = typeof window !== "undefined"
    && window.matchMedia("(pointer: coarse)").matches;

  const dragControls = useDragControls();

  const handleDragStart = (e) => {
    onFocus(); 
    dragControls.start(e);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="modal-container">
          <motion.div
            className={`modal-window ${isActive ? "active" : ""} ${title === "about" ? "modal-about" : ""}`}
            onPointerDown={onFocus} 
            onClick={(e) => e.stopPropagation()} 
            drag
            dragControls={dragControls}
            dragListener={false} 
            dragMomentum={false}
            dragElastic={isTouch ? 0 : 0.08}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 32 }}
            transition={
              isTouch
                ? { type: "spring", stiffness: 420, damping: 40, mass: 0.65 }
                : { type: "spring", stiffness: 420, damping: 34, mass: 0.65 }
            }
          >
            <div 
              className="window-bar modal-bar"
              onPointerDown={handleDragStart}
            >
              <span>{title}</span>
              <button
                className="modal-close-btn"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
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