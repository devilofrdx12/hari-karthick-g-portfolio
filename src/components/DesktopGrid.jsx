import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  }
];

function WorkContent() {
  return (
    <div className="work-content-container">
      {/* 1. Notice Banner */}
      <div className="work-banner">
        Accepting work offers via my <a href="mailto:karthickharig12@gmail.com" className="work-email-link">work email!</a>
        <br />
        I do illustration, web design, and web/app development. :)
      </div>

      {/* 2. Side-by-Side Layout */}
      <div className="work-columns">
        {/* Left Column: Tools */}
        <div className="work-column">
          <h2 className="skills-title">TOOLS</h2>
          <div className="skills-grid">
            {[
              "Adobe Premiere Pro",
              "Blender",
              "Adobe Photoshop",
              "Canva",
              "After Effects"
            ].map(tool => (
              <div key={tool} className="skill-pill">
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Development & Projects */}
        <div className="work-column">
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
        </div>
      </div>

      <div className="projects-container">
        {/* Placeholder Project Card 1 */}
        <div className="project-card">
          <div className="project-image-placeholder">
            <img src="/gallery/1.jpg" alt="Project 1" loading="eager" decoding="async" />
          </div>
          <div className="project-info">
            <h3 className="project-title">Placeholder Project</h3>
            <p className="project-desc">
              This is a placeholder description. You can update this text with details about your actual project!
            </p>
            <div className="project-actions">
              <a href="#" target="_blank" rel="noopener noreferrer" className="project-btn">view project</a>
            </div>
          </div>
        </div>

        {/* Placeholder Project Card 2 */}
        <div className="project-card">
          <div className="project-image-placeholder">
            <img src="/gallery/2.jpg" alt="Project 2" loading="eager" decoding="async" />
          </div>
          <div className="project-info">
            <h3 className="project-title">Another Project</h3>
            <p className="project-desc">
              Another placeholder description. Replace this with your actual project details and links!
            </p>
            <div className="project-actions">
              <a href="#" target="_blank" rel="noopener noreferrer" className="project-btn">view project</a>
            </div>
          </div>
        </div>
      </div>
      {/* 3. Other Dev Projects & GitHub */}
      <div className="work-footer-section">
        <h3 className="other-dev-title">Other dev projects:</h3>
        <ul className="other-dev-list">
          <li>This website!</li>
          <li>that's it for now, there are some more projects i'm working on in the background that i'll release soon :)</li>
        </ul>
        <p className="github-link-wrapper">
          See more on <a href="https://github.com/devilofrdx12" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>
        </p>
      </div>
    </div>
  );
}

function GalleryContent() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const pendingImageRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pendingImageRef.current) {
        pendingImageRef.current.onload = null;
      }
    };
  }, []);

  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
    "/gallery/8.jpg",
    "/gallery/9.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
    "/gallery/12.jpg",
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
    "/gallery/16.jpg",
    "/gallery/17.jpg",
    "/gallery/18.jpg",
    "/gallery/19.jpg",
    "/gallery/20.jpg",
    "/gallery/21.png",
    "/gallery/22.png",
    "/gallery/23.png",
    "/gallery/24.webp",
    "/gallery/25.webp",
    "/gallery/26.jpg",
    "/gallery/27.jpg",
    "/gallery/28.jpg",
    "/gallery/29.jpg",
    "/gallery/30.webp"
  ];

  return (
    <>
      <div className="masonry-grid">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="masonry-item"
            whileHover={{ scale: 1.03 }}
            onClick={() => {
              setLoading(true);
              if (pendingImageRef.current) {
                pendingImageRef.current.onload = null;
              }
              const img = new Image();
              pendingImageRef.current = img;
              img.src = src;
              img.onload = () => {
                setSelected(src);
                setLoading(false);
                pendingImageRef.current = null;
              };
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              className="lightbox-image"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function DesktopGrid({ theme }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const desktopRef = useRef(null);

  const vibrate = (pattern = [30, 20, 30]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
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
    setOpenWindows(prev => {
      const updated = prev.filter(w => w !== id);
      if (activeWindow === id) {
        setActiveWindow(updated.length > 0 ? updated[updated.length - 1] : null);
      }
      return updated;
    });
  };

  const content = {
    about: (
      <div className="about-container">

        <div className="about-header">
          <img
            src="/images/profile.webp"
            alt="Hari Karthick"
            className="about-avatar"
          />

          <div className="about-intro">
            <h1 className="about-name">
              <span className="accent">Hari Karthick G</span>
            </h1>

            <p className="about-sub">
              Electronics & Communication Engineering student
            </p>

            <p className="about-sub">
              Engineer • Artist • Video Editor
            </p>
          </div>
        </div>

        <div className="about-body">

          <p>
            hi! i'm hari, a developer and creative enthusiast.
          </p>

          <ul>
            <li>Create interactive web applications</li>
            <li>Experiment with UI and animation</li>
            <li>Build engineering + software projects</li>
            <li>Explore art, design and motion graphics</li>
          </ul>

          <h3>EDUCATION</h3>

          <blockquote>
            Bachelor of Engineering - <span>Electronics & Communication</span>
            <br />
            (Graduation expected in 2028)
          </blockquote>

          <h3>OTHER INTERESTS</h3>

          <ul>
            <li>Embedded systems</li>
            <li>UI design and motion graphics</li>
            <li>Electronics prototyping</li>
            <li>Creative coding</li>
          </ul>

          <h3>LANGUAGE PROFICIENCY</h3>

          <blockquote>
            Native fluency in <span className="accent">English</span> and
            conversational <span className="accent">Tamil</span>.
          </blockquote>

        </div>

      </div>
    ),

    links: (
      <div className="links-container">
        <div className="links-grid">
          {[
            { id: "github", label: "github", link: "https://github.com/devilofrdx12", icon: "/images/icon_links.webp", iconDark: "/images/icon_links_dark.webp" },
            { id: "linkedin", label: "linkedin", link: "https://www.linkedin.com/in/hari-karthick-g-0d12", icon: "/images/icon_links.webp", iconDark: "/images/icon_links_dark.webp" },
            { id: "instagram", label: "instagram", link: "https://www.instagram.com/_dark_Shades_12_/", icon: "/images/icon_ig_solid_dark.webp", iconDark: "/images/icon_ig_solid.webp" },
          ].map((item) => (
            <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="link-card">
              <motion.div className="link-motion" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <img src={item.icon} alt={item.label} className="link-icon-img" />
                <span className="link-text-label">{item.label}</span>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    ),

    work: <WorkContent />,
    gallery: <GalleryContent />,
  };

  return (
    <>
      <div className="desktop-wrapper" ref={desktopRef}>
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

      {items.map(item => (
        <Modal
          key={item.id}
          open={openWindows.includes(item.id)}
          title={item.id}
          isActive={activeWindow === item.id}
          onFocus={() => setActiveWindow(item.id)}
          onClose={() => closeWindow(item.id)}
          dragConstraints={desktopRef}
          initialPosition={item.id === "links" && window.innerWidth >= 769 ? { x: 300, y: 30 } : { x: 0, y: 0 }}
        >
          {content[item.id]}
        </Modal>
      ))}

    </>
  );
}