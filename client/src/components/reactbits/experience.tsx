// Adaptations of React Bits BlurText, AnimatedContent and Magnet behaviors.
// https://github.com/DavidHDev/react-bits — see LICENSE.md.
// Native semantic elements stay readable in server-rendered and reduced-motion states.
import {
  createElement,
  useEffect,
  useRef,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { gsap } from "gsap";
type TextProps = HTMLAttributes<HTMLElement> & {
  as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
};
export function BitsText({ as, children, ...props }: TextProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    // Body text is intentionally settled. The hero is the authored reveal.
    if (!el || as !== "h1") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const animation = gsap.fromTo(
      el,
      { filter: "blur(3px)" },
      {
        filter: "blur(0px)",
        duration: 0.6,
        ease: "expo.out",
        clearProps: "filter",
      },
    );
    const stop = () => {
      if (media.matches) {
        animation.kill();
        gsap.set(el, { clearProps: "filter" });
      }
    };
    media.addEventListener("change", stop);
    return () => {
      media.removeEventListener("change", stop);
      animation.kill();
    };
  }, [as]);
  return createElement(
    as,
    { ...props, ref, "data-reactbits": "BlurText" },
    children,
  );
}
export function AnimatedSection({
  children,
  motion = "settled",
  ...props
}: HTMLAttributes<HTMLElement> & { motion?: "intro" | "settled" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || motion !== "intro") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const animation = gsap.fromTo(
      el,
      { y: 12 },
      { y: 0, duration: 0.65, ease: "expo.out", clearProps: "transform" },
    );
    const stop = () => {
      if (media.matches) {
        animation.kill();
        gsap.set(el, { clearProps: "transform" });
      }
    };
    media.addEventListener("change", stop);
    return () => {
      media.removeEventListener("change", stop);
      animation.kill();
    };
  }, [motion]);
  return createElement(
    "section",
    { ...props, ref, "data-reactbits": "AnimatedContent" },
    children,
  );
}
type ControlProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: "a" | "button" };
export function BitsControl({ as, children, ...props }: ControlProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: gsap.core.Tween | undefined;
    const reset = () => {
      animation?.kill();
      gsap.set(el, { clearProps: "transform" });
    };
    const move = (event: PointerEvent) => {
      if (media.matches || event.pointerType !== "mouse") return;
      const box = el.getBoundingClientRect();
      animation?.kill();
      animation = gsap.to(el, {
        x: Math.max(
          -3,
          Math.min(3, (event.clientX - box.left - box.width / 2) / 16),
        ),
        y: Math.max(
          -3,
          Math.min(3, (event.clientY - box.top - box.height / 2) / 16),
        ),
        duration: 0.2,
        ease: "expo.out",
      });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("blur", reset);
    media.addEventListener("change", reset);
    return () => {
      reset();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("blur", reset);
      media.removeEventListener("change", reset);
    };
  }, []);
  return createElement(
    as,
    { ...props, ref, "data-reactbits": "Magnet" },
    children,
  );
}
