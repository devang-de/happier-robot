import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME, MONO } from '../theme';

export const SystemLabel: React.FC<{
  text: string;
  startFrame: number;
  color?: string;
  icon?: string;
}> = ({ text, startFrame, color = THEME.blue, icon }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const f = frame - startFrame;
  const opacity = interpolate(f, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(f, [0, 8], [0.9, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 8,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          padding: '4px 12px',
          borderRadius: 20,
          background: `${color}15`,
          border: `1px solid ${color}30`,
          fontSize: 11,
          fontFamily: MONO,
          color,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {icon && <span>{icon}</span>}
        {text}
      </div>
    </div>
  );
};
