"use client";

interface ContourBackgroundProps {
  opacity?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export default function ContourBackground({
  opacity = 0.06,
  color = "#12372A",
  animate = false,
  className = "",
}: ContourBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className={`h-full w-full ${animate ? "animate-pulse" : ""}`}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[220, 300, 380, 460, 540].map((y, index) => (
          <path
            key={index}
            d={`M0 ${y} C150 ${y - 40} 250 ${y + 60} 400 ${y + 20} S700 ${
              y - 60
            } 1000 ${y}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}