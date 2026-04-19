import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export const GradientBackground: React.FC<{
  accentColor?: string;
  intensity?: number;
}> = ({ accentColor = THEME.accent, intensity = 0.15 }) => {
  const frame = useCurrentFrame();
  const x = 50 + Math.sin(frame * 0.008) * 10;
  const y = 50 + Math.cos(frame * 0.006) * 10;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${THEME.bgTop} 0%, ${THEME.bg} 100%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 800px 600px at ${x}% ${y}%, ${accentColor}${Math.round(intensity * 255).toString(16).padStart(2, '0')}, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
