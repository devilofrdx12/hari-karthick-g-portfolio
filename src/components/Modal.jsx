import { useRef } from "react";
import { motion, AnimatePresence, useDragControls, useMotionValue } from "framer-motion";
import "./Modal.css";

export default function Modal({ open, onClose, title, children, isActive, onFocus, dragConstraints, initialPosition = { x: 0, y: 0 } }) {
  const isTouch = typeof window !== "undefined"
    && window.matchMedia("(pointer: coarse)").matches;

  const dragControls = useDragControls();

  // Persist drag position even when the window is closed and unmounted!
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);

  const handleDragStart = (e) => {
    onFocus();
    dragControls.start(e);
  };

  const customTransition = open
    ? { type: "tween", ease: [0.2, 1, 0.3, 1], duration: 0.25 }
    : { type: "tween", ease: "easeOut", duration: 0.2 };

  return (
    <motion.div
      key={`modal-container-${title}`}
      className="modal-container"
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        zIndex: open ? (isActive ? 60 : 10) : -1
      }}
      transition={customTransition}
      style={{ pointerEvents: "none" }}
    >
      {/* Enter/Exit animation wrapper to isolate from drag state */}
      <motion.div
        initial={false}
        animate={{
          scale: open ? 1 : 0.9
        }}
        transition={customTransition}
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", willChange: "transform" }}
      >
        {/* Draggable window - uses persistent x/y values! */}
        <motion.div
          className={`modal-window ${isActive ? "active" : ""} modal-${title}`}
          style={{ x, y, pointerEvents: open ? "auto" : "none" }}
          onPointerDown={onFocus}
          onClick={(e) => e.stopPropagation()}
          drag
          dragControls={dragControls}
          dragConstraints={dragConstraints}
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
              [x]
            </button>
          </div>

          <div className="modal-content">{children}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}