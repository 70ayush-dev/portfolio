import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme-provider";

interface GridPoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  col: number;
  row: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<GridPoint[]>([]);
  const gridDimsRef = useRef({ cols: 0, rows: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000, isActive: false, speed: 0 });
  const animFrameRef = useRef<number>(0);
  const { theme } = useTheme();

  const SPACING = 40;
  const INFLUENCE_RADIUS = 180;
  const PUSH_FORCE = 50;
  const RETURN_SPEED = 0.035;
  const FRICTION = 0.9;

  const initGrid = useCallback((width: number, height: number) => {
    const points: GridPoint[] = [];
    const cols = Math.ceil(width / SPACING) + 2;
    const rows = Math.ceil(height / SPACING) + 2;
    gridDimsRef.current = { cols, rows };

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * SPACING - SPACING / 2;
        const y = r * SPACING - SPACING / 2;
        points.push({
          x, y,
          originX: x,
          originY: y,
          vx: 0, vy: 0,
          col: c, row: r,
        });
      }
    }
    gridRef.current = points;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let displayWidth = 0;
    let displayHeight = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      displayWidth = rect.width;
      displayHeight = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initGrid(rect.width, rect.height);
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      const dx = newX - mouseRef.current.x;
      const dy = newY - mouseRef.current.y;
      mouseRef.current.speed = Math.sqrt(dx * dx + dy * dy);
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = newX;
      mouseRef.current.y = newY;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const newX = e.touches[0].clientX - rect.left;
        const newY = e.touches[0].clientY - rect.top;
        mouseRef.current.speed = Math.sqrt(
          Math.pow(newX - mouseRef.current.x, 2) +
          Math.pow(newY - mouseRef.current.y, 2)
        );
        mouseRef.current.x = newX;
        mouseRef.current.y = newY;
        mouseRef.current.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    const isDark = theme === "dark";
    const dotBaseAlpha = isDark ? 0.15 : 0.1;
    const lineBaseAlpha = isDark ? 0.12 : 0.08;
    const primaryR = isDark ? 168 : 139;
    const primaryG = isDark ? 140 : 92;
    const primaryB = isDark ? 255 : 246;
    const accentR = isDark ? 216 : 192;
    const accentG = isDark ? 150 : 132;
    const accentB = isDark ? 255 : 252;

    const getPoint = (col: number, row: number): GridPoint | undefined => {
      const { cols, rows } = gridDimsRef.current;
      if (col < 0 || col >= cols || row < 0 || row >= rows) return undefined;
      return gridRef.current[col * rows + row];
    };

    const animate = () => {
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const points = gridRef.current;
      const mouse = mouseRef.current;
      const { cols, rows } = gridDimsRef.current;
      const forceMultiplier = Math.min(1 + mouse.speed * 0.01, 2.5);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / INFLUENCE_RADIUS) * PUSH_FORCE * forceMultiplier;
            const angle = Math.atan2(dy, dx);

            const waveOffset = Math.sin(dist * 0.04 - Date.now() * 0.003) * 0.3;
            p.vx += Math.cos(angle) * (force + waveOffset) * 0.06;
            p.vy += Math.sin(angle) * (force + waveOffset) * 0.06;
          }
        }

        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const p = getPoint(c, r);
          if (!p) continue;

          const displacementSq = (p.x - p.originX) ** 2 + (p.y - p.originY) ** 2;
          const displacement = Math.sqrt(displacementSq);

          const right = getPoint(c + 1, r);
          const down = getPoint(c, r + 1);
          const downRight = getPoint(c + 1, r + 1);

          if (right) {
            const rDisp = Math.sqrt((right.x - right.originX) ** 2 + (right.y - right.originY) ** 2);
            const avgDisp = (displacement + rDisp) / 2;
            const alpha = avgDisp > 0.5
              ? lineBaseAlpha + Math.min(avgDisp * 0.02, isDark ? 0.35 : 0.2)
              : lineBaseAlpha * 0.3;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(right.x, right.y);
            ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${alpha})`;
            ctx.lineWidth = avgDisp > 2 ? 0.8 : 0.4;
            ctx.stroke();
          }

          if (down) {
            const dDisp = Math.sqrt((down.x - down.originX) ** 2 + (down.y - down.originY) ** 2);
            const avgDisp = (displacement + dDisp) / 2;
            const alpha = avgDisp > 0.5
              ? lineBaseAlpha + Math.min(avgDisp * 0.02, isDark ? 0.35 : 0.2)
              : lineBaseAlpha * 0.3;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(down.x, down.y);
            ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${alpha})`;
            ctx.lineWidth = avgDisp > 2 ? 0.8 : 0.4;
            ctx.stroke();
          }

          if (downRight) {
            const drDisp = Math.sqrt((downRight.x - downRight.originX) ** 2 + (downRight.y - downRight.originY) ** 2);
            const avgDisp = (displacement + drDisp) / 2;

            if (avgDisp > 1.5) {
              const alpha = Math.min(avgDisp * 0.012, isDark ? 0.2 : 0.12);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(downRight.x, downRight.y);
              ctx.strokeStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${alpha})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }

          const dotAlpha = displacement > 0.5
            ? dotBaseAlpha + Math.min(displacement * 0.025, isDark ? 0.6 : 0.4)
            : dotBaseAlpha;
          const dotRadius = 1 + Math.min(displacement * 0.04, 1.5);

          ctx.beginPath();
          ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${dotAlpha})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [theme, initGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
      data-testid="canvas-particles"
    />
  );
}
