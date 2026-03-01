import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import "./DesktopGrid.css";

const items = [
  {
    id: "about",
    label: "about",
    icon: "/images/icon_about.webp",
    iconDark: "/images/icon_about_dark.webp",
  },
  {
    id: "links",
    label: "links",
    icon: "/images/icon_links.webp",
    iconDark: "/images/icon_links_dark.webp",
  },
  {
    id: "work",
    label: "work",
    icon: "/images/icon_work.webp",
    iconDark: "/images/icon_work_dark.webp",
  },
  {
    id: "gallery",
    label: "gallery",
    icon: "/images/icon_work.webp",
    iconDark: "/images/icon_work_dark.webp",
  },
  {
    id: "personal info",
    label: "personal info",
    icon: "/images/icon_faq.webp",
    iconDark: "/images/icon_faq_dark.webp",
  }
];

function WorkContent() {
  return (
    <div className="skills-wrapper">

      <h2 className="skills-title">DEVELOPMENT</h2>
      <div className="skills-grid">
        {[
          "C",
          "C++",
          "Java",
          "Python",
          "React",
          "Vite",
          "HTML/CSS",
          "JavaScript"
        ].map(skill => (
          <div key={skill} className="skill-pill">
            {skill}
          </div>
        ))}
      </div>

      <h2 className="skills-title">TOOLS</h2>
      <div className="skills-grid">
        {[
          "Adobe Premiere Pro",
          "Blender",
          "Adobe Photoshop",
          "Canva"
        ].map(tool => (
          <div key={tool} className="skill-pill">
            {tool}
          </div>
        ))}
      </div>

    </div>
  );
}

export default function DesktopGrid({ theme }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const vibrate = (pattern = [30, 20, 30]) => {
    if (!("vibrate" in navigator)) return;
    navigator.vibrate(pattern);
  };


  const openWindow = (id) => {
    navigator.vibrate([20, 15, 20]);
    setOpenWindows(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
    setActiveWindow(id);
  };

  const closeWindow = (id) => {
    vibrate([15, 10, 15]);
    setOpenWindows(prev => prev.filter(w => w !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const content = {
    about: (
      <>
        <h2>About Me</h2>
        <p>
          I'm Hari Karthick, an Electronics and communication engineering
          student passionate about programming, design, art, modelling, and creative technology.
        </p>

        <p>
          I enjoy building interactive web experiences, experimenting with UI,
          and combining engineering with art.
        </p>
      </>
    ),

    links: (
      <>
        <h2>Links</h2>
        <ul>
          <li><a href="https://github.com/devilofrdx12" target="_blank">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/hari-karthick-g-0d12" target="_blank">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/_dark_Shades_12_?igsh=MTN0cnQ5bGFzdWcwMQ==" target="_blank">Instagram</a></li>
        </ul>
      </>
    ),

    work: <WorkContent />,

    gallery: (
      <>
        <h2>Gallery</h2>
        <p>Artwork, experiments, edits, and visuals coming soon.</p>
      </>
    ),

    "personal info": (
      <>
        <h2>Personal Info</h2>
        <p>Phone number: +91 9789734998</p>
        </>
    )
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
              hola! <span>i’m Hari Karthick</span>
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
                    <div className="icon-image-wrapper">
                      <img
                        src={
                          theme === "dark" ? item.iconDark : item.icon
                        }
                        alt={item.label}
                        className="icon-image"
                      />
                    </div>
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
          {content[id]}
        </Modal>
      ))}
    </>
  );
}