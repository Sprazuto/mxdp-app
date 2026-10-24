"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx?.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Beam configuration
    const beams = [
      { x: -100, y: 100, width: 300, height: 400, angle: -30, color: "rgba(16, 185, 129, 0.15)", speed: 0.3, phase: 0 },
      { x: 400, y: -50, width: 250, height: 350, angle: 45, color: "rgba(249, 115, 22, 0.12)", speed: 0.25, phase: Math.PI / 3 },
      { x: 200, y: 300, width: 400, height: 200, angle: 15, color: "rgba(14, 165, 233, 0.1)", speed: 0.2, phase: (2 * Math.PI) / 3 },
    ];

    let animationId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (!ctx) return;
      const deltaTime = (time - lastTime) / 1000; // Convert to seconds
      lastTime = time;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      beams.forEach((beam) => {
        if (!reducedMotion) {
          beam.phase += beam.speed * deltaTime;
          const driftX = Math.sin(beam.phase) * 20;
          const driftY = Math.cos(beam.phase * 0.7) * 15;
          beam.x += driftX * 0.01;
          beam.y += driftY * 0.01;
        }

        ctx.save();
        ctx.translate(beam.x + beam.width / 2, beam.y + beam.height / 2);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const gradient = ctx.createLinearGradient(-beam.width / 2, -beam.height / 2, beam.width / 2, beam.height / 2);
        gradient.addColorStop(0, beam.color);
        gradient.addColorStop(0.5, beam.color.replace("0.15", "0.08").replace("0.12", "0.06").replace("0.1", "0.05"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.filter = "blur(60px)";
        ctx.fillRect(-beam.width / 2, -beam.height / 2, beam.width, beam.height);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      animationId = requestAnimationFrame(animate);
    } else {
      // Draw static version for reduced motion
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      beams.forEach((beam) => {
        ctx.save();
        ctx.translate(beam.x + beam.width / 2, beam.y + beam.height / 2);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const gradient = ctx.createLinearGradient(-beam.width / 2, -beam.height / 2, beam.width / 2, beam.height / 2);
        gradient.addColorStop(0, beam.color);
        gradient.addColorStop(0.5, beam.color.replace("0.15", "0.08").replace("0.12", "0.06").replace("0.1", "0.05"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.filter = "blur(60px)";
        ctx.fillRect(-beam.width / 2, -beam.height / 2, beam.width, beam.height);
        ctx.restore();
      });
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none",
        className
      )}
      aria-hidden="true"
    />
  );
}