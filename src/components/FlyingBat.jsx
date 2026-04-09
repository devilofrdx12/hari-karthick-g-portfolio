import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./FlyingBat.css";

const BAT_IMAGE = "/images/universal_animated.png";

export default function FlyingBat({ theme }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const lastCursorX = useRef(0);
  // NEW: A dedicated memory for the direction to calculate math instantly
  const isFacingLeftRef = useRef(false); 

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 }; 
  const batX = useSpring(mouseX, springConfig);
  const batY = useSpring(mouseY, springConfig);
  
  const rotate = useTransform(batX, (val) => isFacingLeft ? (val - mouseX.get()) * 0.05 : (val - mouseX.get()) * -0.05);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (theme !== "dark" || isMobile) return;

    const handleMouseMove = (e) => {
      const overModal = e.target.closest('.modal-window');
      const overMain = e.target.closest('.main-window');
      
      if (overModal) setIsVisible(true);
      else if (overMain) setIsVisible(false);
      else setIsVisible(true);

      // 1. FLIP LOGIC & MEMORY
      if (e.clientX < lastCursorX.current) {
        setIsFacingLeft(true);
        isFacingLeftRef.current = true;
      } else if (e.clientX > lastCursorX.current) {
        setIsFacingLeft(false);
        isFacingLeftRef.current = false;
      }
      lastCursorX.current = e.clientX;

      // 2. THE DYNAMIC TRAILING MATH
      const batWidth = 200;
      const gap = 5; // Pixels away from the cursor

      // If moving left, the bat trails on the right side.
      // If moving right, the bat trails on the left side (offset by its width).
      const targetX = isFacingLeftRef.current 
        ? e.clientX + gap 
        : e.clientX - batWidth - gap;

      // Keeps the pointer aligned with the top of the bat image + gap
      const targetY = e.clientY + gap;

      mouseX.set(targetX); 
      mouseY.set(targetY);
    };

    window.addEventListener("mousemove", handleMouseMove, { capture: true, passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove, { capture: true });
  }, [theme, isMobile, mouseX, mouseY]);

  if (theme !== "dark") return null;

  // Swap to 1 : -1 if the bat is flying backwards!
  const flipScale = isFacingLeft ? 1 : -1; 

  if (isMobile) {
    return (
      <div className="flying-bat-container mobile-bat">
        <img src={BAT_IMAGE} alt="Pixel Bat" className="bat-apng" />
      </div>
    );
  }

  return (
    <motion.div
      className="flying-bat-container follower-bat hfr-layer"
      animate={{ opacity: isVisible ? 1 : 0 }} 
      style={{ x: batX, y: batY, scaleX: flipScale, rotate: rotate }}
    >
      <img src={BAT_IMAGE} alt="Pixel Bat" className="bat-apng" />
    </motion.div>
  );
}