import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import "./DesktopGrid.css";

const items = [
  { id: "about", label: "about" },
  { id: "links", label: "links" },
  { id: "work", label: "work" },
  { id: "gallery", label: "gallery" },
];

export default function DesktopGrid() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const isTouch = typeof window !== "undefined"
    && window.matchMedia("(pointer: coarse)").matches;


  const openWindow = (id) => {
    setOpenWindows(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
    setActiveWindow(id);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  return (
    <>
      <div className="desktop-wrapper">
        <div className="main-window">
          <div className="window-bar">Home</div>

          <div className="window-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              hola! <span>i’m Hari Karthick G</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              engineer | artist | video editor
            </motion.p>

            <div className="icon-grid">
              {items.map(item => (
                <button
                  key={item.id}
                  className="icon-btn"
                  onClick={() => openWindow(item.id)}
                >
                  <motion.div
                    className="icon-motion"
                    initial={false}
                    animate={{ scale: 1, y: 0 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.96, y: -2 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                      mass: 0.65
                    }}
                  >
                    <div className="icon-outline" />
                    <span>{item.label}</span>
                  </motion.div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openWindows.map(id => (
        <Modal
          key={id}
          open
          title={id}
          isActive={activeWindow === id}
          onFocus={() => setActiveWindow(id)}
          onClose={() => closeWindow(id)}
        >
          <p>{id} content goes here.</p>
        </Modal>
      ))}
    </>
  );
}
