// Adapted from React Bits SpotlightCard: https://github.com/DavidHDev/react-bits
import { useRef, type PropsWithChildren, type MouseEvent } from "react";
export default function SpotlightCard({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: MouseEvent<HTMLDivElement>) {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`,
    );
    ref.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  }
  return (
    <div ref={ref} onMouseMove={move} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}
