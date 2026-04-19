import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, SPRING_CONFIG } from '../theme';

export const KPICard: React.FC<{
  label: string;
  value: string;
  color?: string;
  delay?: number;
  width?: number;
  highlight?: boolean;
  highlightFrame?: number;
  newValue?: string;
}> = ({
  label,
  value,
  color = THEME.accent,
  delay = 0,
  width = 200,
  highlight = false,
  highlightFrame = 9999,
  newValue,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - delay);

  const scale = spring({ frame: f, fps, config: SPRING_CONFIG });
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  const isHighlighted = highlight && frame >= highlightFrame;
  const hf = isHighlighted ? Math.max(0, frame - highlightFrame) : 0;
  const glowOpacity = isHighlighted
    ? interpolate(hf, [0, 10, 25], [0, 0.6, 0.15], { extrapolateRight: 'clamp' })
    : 0;

  const displayValue = isHighlighted && newValue ? newValue : value;

  return (
    <div
      style={{
        width,
        padding: '20px 16px',
        background: THEME.cardBg,
        borderRadius: 20,
        border: `1px solid ${isHighlighted ? `${THEME.green}40` : THEME.border}`,
        opacity,
        transform: `scale(${interpolate(scale, [0, 1], [0.85, 1])})`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isHighlighted && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle, ${THEME.green}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
          }}
        />
      )}
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color,
          fontFamily: FONT,
          position: 'relative',
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 13,
          color: THEME.textMuted,
          fontFamily: FONT,
          marginTop: 4,
          position: 'relative',
        }}
      >
        {label}
      </div>
    </div>
  );
};
