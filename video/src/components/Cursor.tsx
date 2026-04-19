import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME } from '../theme';

export const Cursor: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  startFrame: number;
  duration?: number;
  clickFrame?: number;
}> = ({ fromX, fromY, toX, toY, startFrame, duration = 30, clickFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const f = frame - startFrame;
  const progress = interpolate(f, [0, duration], [0, 1], { extrapolateRight: 'clamp' });

  // Ease in-out
  const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const x = fromX + (toX - fromX) * ease;
  const y = fromY + (toY - fromY) * ease;

  const isClicking = clickFrame !== undefined && frame >= clickFrame && frame < clickFrame + 6;
  const clickScale = isClicking ? 0.85 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 1000,
        pointerEvents: 'none',
        transform: `scale(${clickScale})`,
        transition: 'transform 0.1s',
      }}
    >
      {/* Cursor SVG */}
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3L19 12L12 13L9 20L5 3Z"
          fill="white"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={1}
        />
      </svg>
      {/* Click ripple */}
      {isClicking && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `2px solid ${THEME.accent}`,
            transform: 'translate(-8px, -8px)',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
};
