import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const PROBLEMS = [
  'Qualifying leads manually',
  'Writing follow-up emails',
  'Tracking open questions',
  'Scheduling callbacks',
];

export const ProblemScene: React.FC = () => {
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
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONT,
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,139,130,0.1) 0%, transparent 70%)`,
          top: '10%',
          right: '10%',
        }}
      />

      <div style={{ maxWidth: 900, padding: 60 }}>
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontSize: 48,
            fontWeight: 800,
            color: THEME.textPrimary,
            marginBottom: 60,
            lineHeight: 1.2,
          }}
        >
          Sales teams spend{' '}
          <span style={{ color: THEME.red }}>70%</span> of time
          <br />
          on repetitive tasks
        </div>

        {/* Problem list */}
        {PROBLEMS.map((problem, i) => {
          const delay = 30 + i * 20;
          const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const itemX = interpolate(frame, [delay, delay + 20], [-40, 0], {
            extrapolateRight: 'clamp',
          });
          const itemScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIG,
          });

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px) scale(${interpolate(itemScale, [0, 1], [0.95, 1])})`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: THEME.red,
                  flexShrink: 0,
                  boxShadow: `0 0 16px ${THEME.red}60`,
                }}
              />
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  color: THEME.textSecondary,
                  fontFamily: MONO,
                }}
              >
                {problem}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
