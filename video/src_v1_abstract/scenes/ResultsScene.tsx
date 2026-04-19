import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const METRICS = [
  { value: '6', label: 'Production Workflows', color: THEME.accent },
  { value: '50', label: 'Quality Northstars', color: THEME.green },
  { value: '100%', label: 'Autonomous', color: THEME.blue },
  { value: '∞', label: 'Self-Learning Memory', color: THEME.purple },
  { value: '✓', label: 'Human-in-the-Loop Safety', color: THEME.yellow },
];

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: FONT,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.15,
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 56,
          fontWeight: 800,
          color: THEME.textPrimary,
        }}
      >
        <span style={{ color: THEME.accent }}>Impact</span>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 40,
          maxWidth: 1200,
          marginTop: 60,
        }}
      >
        {METRICS.map((metric, i) => {
          const delay = 25 + i * 18;
          const metricScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIG,
          });
          const metricOpacity = interpolate(
            frame,
            [delay, delay + 12],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          // Animated counter for numeric values
          const isNumeric = /^\d+$/.test(metric.value);
          const counterVal = isNumeric
            ? Math.round(
                interpolate(
                  frame,
                  [delay, delay + 40],
                  [0, parseInt(metric.value)],
                  { extrapolateRight: 'clamp' }
                )
              )
            : metric.value;

          return (
            <div
              key={i}
              style={{
                opacity: metricOpacity,
                transform: `scale(${interpolate(metricScale, [0, 1], [0.8, 1])})`,
                width: 200,
                textAlign: 'center',
                padding: 28,
                background: THEME.surface,
                borderRadius: THEME.cardRadius,
                border: `1px solid ${metric.color}25`,
                boxShadow: `0 4px 30px ${metric.color}10`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color: metric.color,
                  fontFamily: MONO,
                  lineHeight: 1,
                }}
              >
                {counterVal}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: THEME.textMuted,
                  marginTop: 14,
                  lineHeight: 1.3,
                }}
              >
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
