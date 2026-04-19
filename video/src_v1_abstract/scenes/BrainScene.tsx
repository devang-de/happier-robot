import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const DATASETS = [
  { name: 'lead_context', color: THEME.blue },
  { name: 'negotiation_brain', color: THEME.accent },
  { name: 'brain_patterns', color: THEME.purple },
  { name: 'product_knowledge', color: THEME.green },
];

export const BrainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const centerX = 960;
  const centerY = 520;

  // Brain pulse
  const brainScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CONFIG,
  });

  const brainPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  const footerOpacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const footerY = interpolate(frame, [140, 165], [20, 0], {
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
          left: centerX - 400,
          top: centerY - 400,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 60%)`,
          opacity: 0.25,
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
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: THEME.textPrimary,
          }}
        >
          Self-Learning Memory via{' '}
          <span style={{ color: THEME.accent }}>Cognee</span>
        </div>
      </div>

      {/* Expanding rings */}
      {DATASETS.map((ds, i) => {
        const delay = 30 + i * 25;
        const ringScale = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: { damping: 15, stiffness: 60, mass: 0.8 },
        });
        const ringOpacity = interpolate(frame, [delay, delay + 20], [0, 0.6], {
          extrapolateRight: 'clamp',
        });
        const ringRadius = 80 + i * 60;

        return (
          <React.Fragment key={i}>
            {/* Ring */}
            <div
              style={{
                position: 'absolute',
                left: centerX - ringRadius,
                top: centerY - ringRadius,
                width: ringRadius * 2,
                height: ringRadius * 2,
                borderRadius: '50%',
                border: `2px solid ${ds.color}`,
                opacity: ringOpacity * ringScale,
                transform: `scale(${ringScale})`,
              }}
            />
            {/* Label */}
            <div
              style={{
                position: 'absolute',
                left: centerX + ringRadius - 20,
                top: centerY - 12,
                opacity: interpolate(frame, [delay + 10, delay + 25], [0, 1], {
                  extrapolateRight: 'clamp',
                }),
                fontSize: 14,
                fontFamily: MONO,
                fontWeight: 600,
                color: ds.color,
                whiteSpace: 'nowrap',
                background: `${THEME.bg}cc`,
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {ds.name}
            </div>
          </React.Fragment>
        );
      })}

      {/* Center brain */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 45,
          top: centerY - 45,
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accent}50, ${THEME.accent}20)`,
          border: `3px solid ${THEME.accent}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${brainScale * brainPulse})`,
          boxShadow: `0 0 50px ${THEME.accent}40`,
        }}
      >
        <div style={{ fontSize: 40 }}>🧠</div>
      </div>

      {/* Footer quote */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
          opacity: footerOpacity,
          transform: `translateY(${footerY}px)`,
          fontSize: 26,
          fontWeight: 500,
          color: THEME.textMuted,
          fontStyle: 'italic',
        }}
      >
        Every call teaches the agent. Every email refines its approach.
      </div>
    </AbsoluteFill>
  );
};
