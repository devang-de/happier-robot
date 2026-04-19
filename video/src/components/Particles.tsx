import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  delay: number;
}

// Deterministic pseudo-random
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

export const Particles: React.FC<{
  startFrame: number;
  count?: number;
  centerX?: number;
  centerY?: number;
  colors?: string[];
}> = ({
  startFrame,
  count = 40,
  centerX = 960,
  centerY = 540,
  colors = [THEME.accent, THEME.yellow, THEME.green, '#ffffff'],
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const f = frame - startFrame;

  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: centerX,
      y: centerY,
      vx: (seededRandom(i * 3) - 0.5) * 16,
      vy: (seededRandom(i * 3 + 1) - 0.5) * 16 - 4,
      size: 3 + seededRandom(i * 3 + 2) * 6,
      color: colors[i % colors.length],
      delay: seededRandom(i * 7) * 8,
    }));
  }, [count, centerX, centerY, colors]);

  return (
    <>
      {particles.map((p, i) => {
        const pf = Math.max(0, f - p.delay);
        const t = pf / 30; // seconds
        const px = p.x + p.vx * t * 30;
        const py = p.y + p.vy * t * 30 + 0.5 * 200 * t * t; // gravity
        const opacity = interpolate(pf, [0, 5, 40, 60], [0, 1, 1, 0], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: p.size,
              height: p.size,
              borderRadius: p.size > 5 ? 2 : '50%',
              background: p.color,
              opacity,
              transform: `rotate(${pf * 5}deg)`,
            }}
          />
        );
      })}
    </>
  );
};
