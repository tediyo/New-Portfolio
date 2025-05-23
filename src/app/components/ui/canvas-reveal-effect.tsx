"use client";

import { useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
  animationSpeed = 5,
  containerClassName,
  colors = [[59, 130, 246], [139, 92, 246]],
  dotSize = 3,
}: {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: [number, number, number][];
  dotSize?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);

    const dots: { x: number; y: number; vx: number; vy: number; color: [number, number, number] }[] = [];
    const numDots = Math.floor((width * height) / 1000);

    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${dot.color.join(",")})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeChild(canvas);
    };
  }, [isInView, animationSpeed, colors, dotSize]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    />
  );
}; 