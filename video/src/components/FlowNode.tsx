import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, SPRING_CONFIG } from '../theme';

export const FlowNode: React.FC<{
  label: string;
  icon: string;
  delay?: number;
  x: number;
  y: number;
  size?: number;
  accentColor?: string;
  isCenter?: boolean;
}> = ({
  label,
  icon,
  delay = 0,
  x,
  y,
  size = 100,
  accentColor = THEME.accent,
  isCenter = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: delayedFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(delayedFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = isCenter
    ? 0.3 + Math.sin(frame * 0.05) * 0.15
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size + 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        transform: `scale(${interpolate(scale, [0, 1], [0, 1])})`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: isCenter ? size / 2 : 16,
          background: isCenter
            ? `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`
            : THEME.surface,
          border: `2px solid ${accentColor}60`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          boxShadow: isCenter
            ? `0 0 ${40 + glowPulse * 40}px ${accentColor}${Math.round(glowPulse * 255).toString(16).padStart(2, '0')}`
            : `0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: 600,
          color: THEME.textSecondary,
          fontFamily: FONT,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};
