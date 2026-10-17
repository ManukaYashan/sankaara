interface SankaraLogoProps {
  className?: string;
  size?: number;
  darkSquareColor?: string;
  accentSquareColor?: string;
  frameColor?: string;
}

/**
 * 2D Minimalist Architectural SANKĀRA Logo
 * Symmetrical 4x4 checkerboard adaptation from the sanctuary's crafted teakwood panels.
 * Flat 2D geometric vector without bevels, shadows, or photo textures.
 */
export default function SankaraLogo({
  className = '',
  size = 32,
  darkSquareColor = '#132f27',
  accentSquareColor = '#9e7956',
  frameColor = '#132f27',
}: SankaraLogoProps) {
  // 4x4 Grid coordinates (29x29 area inside 32x32 viewBox)
  const coords = [3.5, 10, 16.5, 23];
  const squareSize = 5.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SANKĀRA Logo"
    >
      {/* Outer Fine Architectural Frame */}
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        stroke={frameColor}
        strokeWidth="1.25"
        fill="none"
      />

      {/* 4x4 Squares Grid - Pure Flat 2D */}
      {coords.map((y, row) =>
        coords.map((x, col) => {
          const isDark = (row + col) % 2 === 1;
          const fill = isDark ? darkSquareColor : accentSquareColor;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width={squareSize}
              height={squareSize}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}
