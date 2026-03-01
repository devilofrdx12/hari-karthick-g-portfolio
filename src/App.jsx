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

  const lightAudio = useRef(null);
  const darkAudio = useRef(null);

  //applyingn theme

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // the ultimate fade engine - version 1.0 - by Hari Karthick

  const fade = (audio, from, to, duration = 800) => {
    if (!audio) return;

    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      const progress = current / steps;
      audio.volume = from + (to - from) * progress;

      if (current >= steps) {
        clearInterval(interval);
        if (to === 0) audio.pause();
      }
    }, stepTime);
  };

  // handle music switching (^~^)

  useEffect(() => {
    if (!soundOn) return;

    const light = lightAudio.current;
    const dark = darkAudio.current;
    if (!light || !dark) return;

    if (theme === "light") {
      dark.volume = 1;
      fade(dark, 1, 0, 900);

      light.currentTime = 0;
      light.play();
      light.volume = 0;
      fade(light, 0, 0.25, 900);
    } else {
      light.volume = 1;
      fade(light, 1, 0, 900);

      dark.currentTime = 0;
      dark.play();
      dark.volume = 0;
      fade(dark, 0, 0.25, 900);
    }
  }, [theme]);

  //sound toggle

  useEffect(() => {
    const light = lightAudio.current;
    const dark = darkAudio.current;
    if (!light || !dark) return;

    if (soundOn) {
      const activeAudio = theme === "light" ? light : dark;
      activeAudio.volume = 0;
      activeAudio.loop = true;
      activeAudio.play();
      fade(activeAudio, 0, 0.25, 800);
    } else {
      fade(light, light.volume, 0, 500);
      fade(dark, dark.volume, 0, 500);
    }
  }, [soundOn]);

  // toggle logic
  return (
    <>
      {/* Two hidden audio elements */}
      <audio ref={lightAudio} src="/audio/light.mp3" loop />
      <audio ref={darkAudio} src="/audio/dark.mp3" loop />

      <div className="top-controls">
        {/* THEME TOGGLE */}
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

      <footer className="footer">
        <p>© 2026 Hari Karthick. Normal portfolio.</p>
      </footer>
    </>
  );
}
