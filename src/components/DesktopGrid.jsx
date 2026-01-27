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

  return (
    <>
      <div className="desktop-wrapper">
        <div className="main-window">
          <div className="window-bar">home</div>

          <div className="window-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              hi! <span>i’m shar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              illustrator · animator · developer
            </motion.p>

            <div className="icon-grid">
              {items.map(item => (
                <motion.button
                  key={item.id}
                  className="icon-btn"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                    mass: 0.5
                  }}
                  onClick={() =>
                    setOpenWindows(prev =>
                      prev.includes(item.id) ? prev : [...prev, item.id]
                    )
                  }
                >
                  <div className="icon-outline" />
                  <span>{item.label}</span>
                </motion.button>
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
          onClose={() =>
            setOpenWindows(prev => prev.filter(w => w !== id))
          }
        >
          <p>{id} content goes here.</p>
        </Modal>
      ))}
    </>
  );
}
