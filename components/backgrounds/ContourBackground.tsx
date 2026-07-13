"use client";

interface ContourBackgroundProps {
  opacity?: number;
  color?: string;
  className?: string;
}

export default function ContourBackground({
  opacity = 0.06,
  color = "#12372A",
  className = "",
}: ContourBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 220 C150 180 250 280 400 240 S700 160 1000 220"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M0 300 C150 260 250 360 400 320 S700 240 1000 300"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M0 380 C150 340 250 440 400 400 S700 320 1000 380"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M0 460 C150 420 250 520 400 480 S700 400 1000 460"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M0 540 C150 500 250 600 400 560 S700 480 1000 540"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}