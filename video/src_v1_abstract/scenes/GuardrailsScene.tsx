import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const CARDS = [
  { label: '25 Northstars per agent', emoji: '⭐', color: THEME.accent },
  { label: '15 Adversarial tests', emoji: '🛡️', color: THEME.red },
  { label: '4 Custom eval scenarios', emoji: '🧪', color: THEME.purple },
  { label: 'Pricing boundaries enforced', emoji: '💰', color: THEME.green },
  { label: 'Product claims verified', emoji: '✅', color: THEME.blue },
  { label: 'Escalation when uncertain', emoji: '🚨', color: THEME.yellow },
];

export const GuardrailsScene: React.FC = () => {
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
          opacity: 0.12,
          top: '15%',
          left: '30%',
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 48,
          fontWeight: 800,
          color: THEME.textPrimary,
        }}
      >
        Built-in{' '}
        <span style={{ color: THEME.accent }}>Quality & Safety</span>
      </div>

      {/* Card grid: 3x2 */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 0,
          right: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 28,
          padding: '0 180px',
        }}
      >
        {CARDS.map((card, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const delay = 25 + row * 20 + col * 10;
          const cardScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIG,
          });
          const cardOpacity = interpolate(
            frame,
            [delay, delay + 12],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                width: 460,
                opacity: cardOpacity,
                transform: `scale(${interpolate(cardScale, [0, 1], [0.85, 1])})`,
                padding: '28px 32px',
                background: THEME.surface,
                borderRadius: THEME.cardRadius,
                border: `1px solid ${card.color}25`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: `0 4px 30px ${card.color}10`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `${card.color}15`,
                  border: `2px solid ${card.color}40`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 26,
                  flexShrink: 0,
                }}
              >
                {card.emoji}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: THEME.textPrimary,
                }}
              >
                {card.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
