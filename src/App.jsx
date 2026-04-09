import { useEffect, useRef, useState } from "react";
import DesktopGrid from "./components/DesktopGrid";
import Akira from "./components/Akira";
import FlyingBat from "./components/FlyingBat";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from "@heroicons/react/24/outline";
import "./styles/base.css";
import "./styles/theme.css";
import "./components/AnimatedWave.jsx";
import AnimatedWave from "./components/AnimatedWave.jsx";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [soundOn, setSoundOn] = useState(false);

  const audioContextRef = useRef(null);
  const lightGainRef = useRef(null);
  const darkGainRef = useRef(null);
  const lightSourceRef = useRef(null);
  const darkSourceRef = useRef(null);

  /// ---------------- fade audio engine version 2.0-----------------

  useEffect(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    const lightAudio = new Audio("/audio/light.mp3");
    const darkAudio = new Audio("/audio/dark.mp3");

    lightAudio.loop = true;
    darkAudio.loop = true;

    const lightSource = ctx.createMediaElementSource(lightAudio);
    const darkSource = ctx.createMediaElementSource(darkAudio);

    const lightGain = ctx.createGain();
    const darkGain = ctx.createGain();

    lightGain.gain.value = 0;
    darkGain.gain.value = 0;

    lightSource.connect(lightGain).connect(ctx.destination);
    darkSource.connect(darkGain).connect(ctx.destination);

    lightSourceRef.current = lightAudio;
    darkSourceRef.current = darkAudio;
    lightGainRef.current = lightGain;
    darkGainRef.current = darkGain;

    return () => ctx.close();
  }, []);

  // crossfade function to smoothly transition between light and dark theme music

  const crossfade = (toTheme) => {
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    const lightGain = lightGainRef.current;
    const darkGain = darkGainRef.current;

    const fadeDuration = 1.2; // seconds

    if (toTheme === "light") {
      lightGain.gain.cancelScheduledValues(now);
      darkGain.gain.cancelScheduledValues(now);

      lightGain.gain.setValueAtTime(lightGain.gain.value, now);
      lightGain.gain.exponentialRampToValueAtTime(0.6, now + fadeDuration);

      darkGain.gain.setValueAtTime(darkGain.gain.value, now);
      darkGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
    } else {
      lightGain.gain.cancelScheduledValues(now);
      darkGain.gain.cancelScheduledValues(now);

      darkGain.gain.setValueAtTime(darkGain.gain.value, now);
      darkGain.gain.exponentialRampToValueAtTime(0.6, now + fadeDuration);

      lightGain.gain.setValueAtTime(lightGain.gain.value, now);
      lightGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
    }
  };

  // theme change effect

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (!soundOn) return;
    crossfade(theme);
  }, [theme]);

  // sound on/off effect

  useEffect(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (soundOn) {
      ctx.resume();

      lightSourceRef.current.play();
      darkSourceRef.current.play();

      crossfade(theme);
    } else {
      const now = ctx.currentTime;
      const fadeDuration = 0.8;

      lightGainRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        now + fadeDuration
      );
      darkGainRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        now + fadeDuration
      );
    }
  }, [soundOn]);

  const toggleSound = () => {
    setSoundOn(prev => !prev);
  }
  return (
    <>
      <div className="top-controls">
        <button
          className="control-btn"
          onClick={() =>
            setTheme(prev => (prev === "light" ? "dark" : "light"))
          }
        >
          <img
            src={
              theme === "light"
                ? "/images/dark_mode_light.webp"
                : "/images/dark_mode_dark.webp"
            }
            alt="toggle theme"
            className="ui-img-icon"
          />
        </button>

        <button
          className="control-btn"
          onClick={toggleSound}
        >
          {soundOn ? (
            <SpeakerWaveIcon className="ui-icon" />
          ) : (
            <SpeakerXMarkIcon className="ui-icon" />
          )}
        </button>
      </div>

      <FlyingBat theme={theme} /> 
      <Akira
        soundOn={soundOn}
        toggleSound={toggleSound}
      />
      <div className="page-container">
        <DesktopGrid theme={theme} />
        <AnimatedWave theme={theme} />
        <footer className="footer">
          <p>© 2026 Hari Karthick. Normal portfolio.</p>
        </footer>
      </div>
    </>
  );
}