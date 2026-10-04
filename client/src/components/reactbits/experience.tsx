// Adapted from React Bits BlurText, AnimatedContent and Magnet.
// https://github.com/DavidHDev/react-bits — see LICENSE.md.
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
    if (!el) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: gsap.core.Tween | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || media.matches) return;
        observer.disconnect();
        // Animate from the readable server-rendered state only when visible.
        animation = gsap.fromTo(
          el,
          { filter: "blur(4px)", y: 8 },
          {
            filter: "blur(0px)",
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            clearProps: "filter,transform",
          },
        );
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    const stop = () => {
      if (media.matches) {
        animation?.kill();
        gsap.set(el, { clearProps: "filter,transform" });
      }
    };
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", stop);
      animation?.kill();
    };
  }, []);
  return createElement(
    as,
    { ...props, ref, "data-reactbits": "BlurText" },
    children,
  );
}
export function AnimatedSection({
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: gsap.core.Tween | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || media.matches) return;
        observer.disconnect();
        animation = gsap.fromTo(
          el,
          { y: 20 },
          { y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" },
        );
      },
      { threshold: 0.02 },
    );
    observer.observe(el);
    const stop = () => {
      if (media.matches) {
        animation?.kill();
        gsap.set(el, { clearProps: "transform" });
      }
    };
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", stop);
      animation?.kill();
    };
  }, []);
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
    function reset() {
      animation?.kill();
      if (el) gsap.set(el, { clearProps: "transform" });
    }
    function move(event: PointerEvent) {
      if (!el || media.matches || event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      animation?.kill();
      animation = gsap.to(el, {
        x: Math.max(
          -3,
          Math.min(3, (event.clientX - rect.left - rect.width / 2) / 12),
        ),
        y: Math.max(
          -3,
          Math.min(3, (event.clientY - rect.top - rect.height / 2) / 12),
        ),
        duration: 0.3,
        ease: "power2.out",
      });
    }
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
