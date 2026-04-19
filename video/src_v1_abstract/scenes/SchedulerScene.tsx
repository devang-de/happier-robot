import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const BULLETS = [
  'Checks all active leads',
  'Identifies due follow-ups',
  'Triggers outbound calls or emails',
  'No human intervention needed',
];

export const SchedulerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // Clock animation
  const clockScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CONFIG,
  });

  const clockAngle = interpolate(frame, [0, 210], [0, 360]);

  // "Every 15 minutes" label
  const intervalOpacity = interpolate(frame, [30, 50], [0, 1], {
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
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.2,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 100,
        }}
      >
        {/* Left: Clock */}
        <div
          style={{
            transform: `scale(${clockScale})`,
            position: 'relative',
          }}
        >
          {/* Clock face */}
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: `${THEME.accent}10`,
              border: `3px solid ${THEME.accent}50`,
              position: 'relative',
              boxShadow: `0 0 60px ${THEME.accent}20`,
            }}
          >
            {/* Clock hand */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 3,
                height: 70,
                background: THEME.accent,
                borderRadius: 2,
                transformOrigin: '50% 0%',
                transform: `translateX(-50%) rotate(${clockAngle}deg)`,
              }}
            />
            {/* Center dot */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: THEME.accent,
                transform: 'translate(-50%, -50%)',
              }}
            />
            {/* 12 hour marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const r = 95;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 110 + r * Math.sin(angle) - 3,
                    top: 110 - r * Math.cos(angle) - 3,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: `${THEME.textMuted}80`,
                  }}
                />
              );
            })}
          </div>

          {/* Clock emoji overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: -40,
              width: '100%',
              textAlign: 'center',
              fontSize: 18,
              fontFamily: MONO,
              fontWeight: 700,
              color: THEME.accent,
              opacity: intervalOpacity,
            }}
          >
            Every 15 minutes
          </div>
        </div>

        {/* Right: Content */}
        <div style={{ maxWidth: 600 }}>
          {/* Title */}
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
              fontSize: 44,
              fontWeight: 800,
              color: THEME.textPrimary,
              marginBottom: 50,
            }}
          >
            Autonomous{' '}
            <span style={{ color: THEME.accent }}>Scheduling</span>
          </div>

          {/* Bullets */}
          {BULLETS.map((bullet, i) => {
            const delay = 50 + i * 25;
            const bulletOpacity = interpolate(
              frame,
              [delay, delay + 15],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            const bulletX = interpolate(
              frame,
              [delay, delay + 20],
              [-30, 0],
              { extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: bulletOpacity,
                  transform: `translateX(${bulletX}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: THEME.accent,
                    flexShrink: 0,
                    boxShadow: `0 0 12px ${THEME.accent}60`,
                  }}
                />
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: THEME.textSecondary,
                  }}
                >
                  {bullet}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
