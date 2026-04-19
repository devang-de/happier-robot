import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

export const FlowArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  color?: string;
  curved?: boolean;
}> = ({ x1, y1, x2, y2, delay = 0, color = THEME.accent, curved = false }) => {
  const frame = useCurrentFrame();
  const delayedFrame = Math.max(0, frame - delay);

  const progress = interpolate(delayedFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(delayedFrame, [0, 5], [0, 0.6], {
    extrapolateRight: 'clamp',
  });

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  if (curved) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 - 30;
    const path = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;

    return (
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id={`grad-${x1}-${y1}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray={length}
          strokeDashoffset={length * (1 - progress)}
          opacity={opacity}
        />
      </svg>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x1,
        top: y1,
        width: length * progress,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${color})`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%',
        opacity,
      }}
    />
  );
};
