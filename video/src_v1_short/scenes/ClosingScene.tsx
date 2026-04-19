import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const STATS = [
  { value: '6', label: 'Workflows', color: THEME.accent },
  { value: '50', label: 'Northstars', color: THEME.blue },
  { value: '1', label: 'Self-Learning Brain', color: THEME.green },
];

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase2Start = 120;

  const statsOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const phase1Fade = interpolate(frame, [95, 125], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const phase2Fade = interpolate(frame, [phase2Start, phase2Start + 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const logoScale = spring({
    frame: Math.max(0, frame - phase2Start),
    fps,
    config: SPRING_CONFIG,
  });

  const line1Opacity = interpolate(frame, [phase2Start + 20, phase2Start + 40], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const line1Y = interpolate(frame, [phase2Start + 20, phase2Start + 40], [20, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const line2Opacity = interpolate(frame, [phase2Start + 35, phase2Start + 55], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const line2Y = interpolate(frame, [phase2Start + 35, phase2Start + 55], [20, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const nameOpacity = interpolate(frame, [phase2Start + 50, phase2Start + 70], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const fadeOut = interpolate(frame, [250, 284], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Ambient glow intensifies at end
  const glowIntensity = interpolate(
    frame,
    [0, phase2Start, 250],
    [0.08, 0.12, 0.2],
    { extrapolateRight: 'clamp' }
  );

  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0, 0.04, 0],
  );

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONT,
        opacity: fadeOut,
      }}
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,152,47,0.2) 0%, transparent 70%)`,
          opacity: glowIntensity + glowPulse,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(107,179,255,0.1) 0%, transparent 70%)`,
          opacity: glowIntensity * 0.6,
          top: -100,
          right: 200,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(103,213,156,0.08) 0%, transparent 70%)`,
          opacity: glowIntensity * 0.5,
          bottom: -100,
          left: 300,
        }}
      />

      {/* Phase 1: Stats in glass cards */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          gap: 40,
          opacity: phase1Fade * statsOpacity,
        }}
      >
        {STATS.map((stat, i) => {
          const delay = 10 + i * 18;
          const statScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIG,
          });

          return (
            <div
              key={i}
              style={{
                textAlign: 'center',
                transform: `scale(${interpolate(statScale, [0, 1], [0.8, 1])})`,
                background: THEME.surface,
                borderRadius: 20,
                border: `1px solid ${stat.color}20`,
                boxShadow: `0 4px 30px ${stat.color}10, ${THEME.cardInnerHighlight}`,
                padding: '40px 60px',
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: stat.color,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: THEME.textMuted,
                  marginTop: 12,
                  fontFamily: MONO,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.12em',
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase 2: Closing */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: phase2Fade,
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            fontSize: 72,
            fontWeight: 800,
            color: THEME.textPrimary,
            letterSpacing: '-0.04em',
            marginBottom: 12,
            textShadow: '0 0 80px rgba(255,152,47,0.4), 0 0 120px rgba(255,152,47,0.2)',
          }}
        >
          Happier Robot
        </div>

        {/* Animated divider */}
        <div
          style={{
            width: interpolate(frame, [phase2Start + 5, phase2Start + 25], [0, 240], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${THEME.accent}, transparent)`,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 24,
            fontWeight: 600,
            color: THEME.textSecondary,
            marginBottom: 12,
          }}
        >
          Built at <span style={{ color: THEME.accent }}>TUM.AI</span> Hackathon 2025
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 18,
            fontWeight: 500,
            color: THEME.textMuted,
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span>Powered by</span>
          <span style={{ color: THEME.accent, fontWeight: 700 }}>HappyRobot</span>
          <span style={{ color: THEME.textMuted, fontSize: 8 }}>{'\u25CF'}</span>
          <span style={{ color: THEME.purple, fontWeight: 700 }}>Cognee</span>
        </div>

        {/* Credits */}
        <div
          style={{
            opacity: nameOpacity,
            fontSize: 16,
            fontWeight: 500,
            color: THEME.textMuted,
            textAlign: 'center',
            fontFamily: MONO,
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ color: THEME.textSecondary }}>Devang Dhumal</span>
          <span style={{ color: THEME.accent, fontSize: 8 }}>{'\u25CF'}</span>
          <span style={{ color: THEME.textSecondary }}>Tapus Ranjan</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
