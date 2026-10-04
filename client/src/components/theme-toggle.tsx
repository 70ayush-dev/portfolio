import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";
type Theme = "light" | "dark";
type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [changing, setChanging] = useState(false);
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
  }, []);
  function change() {
    if (changing) return;
    const next: Theme = theme === "light" ? "dark" : "light";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      const canvas = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-canvas")
        .trim();
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", canvas);
      try {
        localStorage.setItem("ayush404-theme", next);
      } catch {
        /* Preference is optional in restricted storage contexts. */
      }
      flushSync(() => setTheme(next));
    };
    const doc = document as TransitionDocument;
    if (
      doc.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setChanging(true);
      const transition = doc.startViewTransition(apply);
      void transition.finished
        .catch(() => {})
        .finally(() => setChanging(false));
    } else apply();
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle color theme"
      aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={change}
      disabled={changing}
    >
      {theme === "dark" ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
      <span className="sr-only">
        {theme === "dark" ? "Dark" : "Light"} mode
      </span>
    </button>
  );
}
