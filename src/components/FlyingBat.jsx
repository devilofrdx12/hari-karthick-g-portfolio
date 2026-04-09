import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./FlyingBat.css";

export default function FlyingBat({ theme }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isLeft, setIsLeft] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 }; 
  const batX = useSpring(mouseX, springConfig);
  const batY = useSpring(mouseY, springConfig);
  const rotate = useTransform(batX, (val) => isLeft ? (val - mouseX.get()) * 0.1 : (val - mouseX.get()) * -0.1);

  useEffect(() => {
    if (theme !== "dark") return;
    const handleMouseMove = (e) => {
      const overModal = e.target.closest('.modal-window');
      const overMain = e.target.closest('.main-window');
      if (overModal) setIsVisible(true);
      else if (overMain) setIsVisible(false);
      else setIsVisible(true);

      if (e.clientX < mouseX.get()) setIsLeft(true);
      else setIsLeft(false);
      
      mouseX.set(e.clientX - 35); 
      mouseY.set(e.clientY - 35);
    };
    window.addEventListener("mousemove", handleMouseMove, { capture: true });
    return () => window.removeEventListener("mousemove", handleMouseMove, { capture: true });
  }, [theme, mouseX, mouseY]);

  if (theme !== "dark") return null;

  const Pixel = ({ x, y }) => <rect x={x} y={y} width="1" height="1" fill="currentColor" />;

  const BatSVG = ({ className = "" }) => (
    <svg viewBox="0 0 16 16" className={`pixel-bat-svg ${className}`}>
      <Pixel x={7} y={6} /><Pixel x={8} y={6} /> 
      <Pixel x={6} y={5} /><Pixel x={9} y={5} /> 
      <Pixel x={7} y={7} /><Pixel x={8} y={7} /> 
      <Pixel x={6} y={8} /><Pixel x={7} y={8} /><Pixel x={8} y={8} /><Pixel x={9} y={8} /> 
      <Pixel x={7} y={9} /><Pixel x={8} y={9} />
      <g className="wings-up">
        <Pixel x={5} y={6} /><Pixel x={4} y={5} /><Pixel x={3} y={4} /><Pixel x={2} y={4} />
        <Pixel x={10} y={6} /><Pixel x={11} y={5} /><Pixel x={12} y={4} /><Pixel x={13} y={4} />
      </g>
      <g className="wings-down">
        <Pixel x={5} y={8} /><Pixel x={4} y={9} /><Pixel x={3} y={10} /><Pixel x={2} y={10} />
        <Pixel x={10} y={8} /><Pixel x={11} y={9} /><Pixel x={12} y={10} /><Pixel x={13} y={10} />
      </g>
    </svg>
  );

  return (
    <>
      {/* 🦇 Follower Bat 🦇 */}
      <motion.div
        className="flying-bat-container follower-bat"
        animate={{ opacity: isVisible ? 1 : 0 }} 
        transition={{ duration: 0.15 }}
        style={{ x: batX, y: batY, scaleX: isLeft ? -1 : 1, rotate: rotate }}
      >
        <BatSVG />
      </motion.div>

      {/* 🦇 NPC Bat 1: The "Diver" (Behind Desktop) 🦇 */}
      <div className="flying-bat-container npc-bat bg-bat-1">
        <BatSVG className="varying-flap" />
      </div>

      {/* 🦇 NPC Bat 2: The "Shadow" (Further & Larger) 🦇 */}
      <div className="flying-bat-container npc-bat bg-bat-2">
        <BatSVG className="slow-flap" />
      </div>
    </>
  );
}