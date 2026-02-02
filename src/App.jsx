import { useEffect, useRef, useState } from "react";
import DesktopGrid from "./components/DesktopGrid";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from "@heroicons/react/24/outline";
import "./styles/base.css";
import "./styles/theme.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Sound control (optional, already discussed)
  useEffect(() => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.volume = 0.25;
      audioRef.current.loop = true;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [soundOn]);

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" />

      <div className="top-controls">
        {/* THEME TOGGLE (IMG BASED) */}
        <button
          className="control-btn"
          onClick={() =>
            setTheme(prev => (prev === "light" ? "dark" : "light"))
          }
          aria-label="Toggle theme"
        >
          <img
            src={
              theme === "light"
                ? "/images/dark_mode_light.webp"
                : "/images/dark_mode_dark.webp"
            }
            alt={theme === "light" ? "Light mode" : "Dark mode"}
            className="ui-img-icon"
          />
        </button>

        {/* SOUND TOGGLE */}
        <button
          className="control-btn"
          onClick={() => setSoundOn(prev => !prev)}
          aria-label="Toggle sound"
        >
          {soundOn ? (
            <SpeakerWaveIcon className="ui-icon" />
          ) : (
            <SpeakerXMarkIcon className="ui-icon" />
          )}
        </button>
      </div>

      <DesktopGrid theme={theme} />
    </>
  );
}
