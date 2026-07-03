import { useRef } from "react";
import { motion, AnimatePresence, useDragControls, useMotionValue } from "framer-motion";
import "./Modal.css";

export default function Modal({ open, onClose, title, children, isActive, onFocus }) {
  const isTouch = typeof window !== "undefined"
    && window.matchMedia("(pointer: coarse)").matches;

  const dragControls = useDragControls();
  
  // Persist drag position even when the window is closed and unmounted!
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragStart = (e) => {
    onFocus(); 
    dragControls.start(e);
  };

  /* spring configs */
  const enterSpring = isTouch
    ? { type: "spring", stiffness: 420, damping: 40, mass: 0.65 }
    : { type: "spring", stiffness: 420, damping: 34, mass: 0.65 };

  const exitTransition = { duration: 0.22, ease: [0.4, 0, 1, 1] };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={`modal-container-${title}`}
          className="modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ pointerEvents: "none" }}
        >
          {/* Enter/Exit animation wrapper to isolate from drag state */}
          <motion.div
            initial={{ scale: 0.92, y: 28 }}
            animate={{ scale: 1, y: 0, transition: enterSpring }}
            exit={{ scale: 0.92, y: 28, transition: enterSpring }}
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Draggable window - uses persistent x/y values! */}
            <motion.div
              className={`modal-window ${isActive ? "active" : ""} modal-${title}`}
              style={{ x, y, pointerEvents: "auto" }}
              onPointerDown={onFocus} 
              onClick={(e) => e.stopPropagation()} 
              drag
              dragControls={dragControls}
              dragListener={false} 
              dragMomentum={false}
              dragElastic={isTouch ? 0 : 0.08}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}