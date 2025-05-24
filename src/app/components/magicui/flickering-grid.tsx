import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
  height?: number;
  width?: number;
}

export function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  color = "#6B7280",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  height = 800,
  width = 800,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const squares: { x: number; y: number; opacity: number }[] = [];
    const totalSquares = Math.floor((width * height) / ((squareSize + gridGap) * (squareSize + gridGap)));

    // Initialize squares
    for (let i = 0; i < totalSquares; i++) {
      const row = Math.floor(i / (width / (squareSize + gridGap)));
      const col = i % (width / (squareSize + gridGap));
      squares.push({
        x: col * (squareSize + gridGap),
        y: row * (squareSize + gridGap),
        opacity: Math.random() * maxOpacity,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      squares.forEach((square) => {
        if (Math.random() < flickerChance) {
          square.opacity = Math.random() * maxOpacity;
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = square.opacity;
        ctx.fillRect(square.x, square.y, squareSize, squareSize);
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      // Cleanup animation if needed
    };
  }, [squareSize, gridGap, color, maxOpacity, flickerChance, height, width]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={cn("absolute inset-0", className)}
    />
  );
} 