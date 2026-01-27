import { useEffect, useState } from "react";
import DesktopGrid from "./components/DesktopGrid";
import {
  SunIcon,
  MoonIcon,
  SpeakerWaveIcon
} from "@heroicons/react/24/outline";
import "./styles/base.css";
import "./styles/theme.css";

export default function App() {
  const [theme, setTheme] = useState("light");

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* Top-left system controls */}
      <div className="top-controls">
        <button
          className="control-btn"
          onClick={() =>
            setTheme(prev => (prev === "light" ? "dark" : "light"))
          }
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <MoonIcon className="ui-icon" />
          ) : (
            <SunIcon className="ui-icon" />
          )}
        </button>

        <button className="control-btn" aria-label="Toggle sound">
          <SpeakerWaveIcon className="ui-icon" />
        </button>
      </div>

      <DesktopGrid />
    </>
  );
}

