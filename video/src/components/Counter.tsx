import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, SPRING_CONFIG } from '../theme';

export const Counter: React.FC<{
  value: string;
  label: string;
  delay?: number;
  color?: string;
  suffix?: string;
}> = ({ value, label, delay = 0, color = THEME.accent, suffix = '' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: delayedFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(delayedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // For numeric values, animate the number
  const numericValue = parseInt(value);
  const isNumeric = !isNaN(numericValue);
  const displayValue = isNumeric
    ? Math.round(
        interpolate(delayedFrame, [0, 40], [0, numericValue], {
          extrapolateRight: 'clamp',
        })
      ).toString() + suffix
    : value;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        transform: `scale(${interpolate(scale, [0, 1], [0.8, 1])})`,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color,
          fontFamily: FONT,
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: THEME.textSecondary,
          fontFamily: FONT,
          marginTop: 8,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
};
