import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.6 },
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const statsOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const poweredOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const authorOpacity = interpolate(frame, [105, 125], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Fade to black at end
  const fadeOut = interpolate(frame, [200, 240], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Glow
  const glowSize = 400 + Math.sin(frame * 0.04) * 80;
  const glowOpacity = 0.2 + Math.sin(frame * 0.025) * 0.08;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.06} />

      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          width: glowSize * 3,
          height: glowSize * 2,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse, ${THEME.accent}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${interpolate(titleScale, [0, 1], [0.5, 1])})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            fontFamily: FONT,
            color: THEME.textPrimary,
            letterSpacing: '-2px',
          }}
        >
          <span style={{ color: THEME.accent }}>Happier</span> Robot
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: subtitleOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            fontFamily: FONT,
            color: THEME.textSecondary,
          }}
        >
          Autonomous AI Sales Agent with a Brain
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: statsOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            padding: '12px 32px',
            borderRadius: 14,
            background: THEME.accentLight,
            border: `1px solid ${THEME.accent}30`,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: THEME.accent, fontFamily: FONT }}>
            Built in 24 hours at TUM.AI Hackathon
          </span>
        </div>
      </div>

      {/* Powered by */}
      <div
        style={{
          position: 'absolute',
          top: '62%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: poweredOpacity,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 14, color: THEME.textFaint, fontFamily: FONT, marginBottom: 12 }}>
          Powered by
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['HappyRobot', 'Cognee', 'Claude'].map((name, i) => (
            <div
              key={i}
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${THEME.border}`,
                fontSize: 14,
                fontWeight: 600,
                color: THEME.textSecondary,
                fontFamily: FONT,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Author */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: authorOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: THEME.textPrimary,
            fontFamily: FONT,
          }}
        >
          Devang Dhumal
        </div>
      </div>

      {/* Fade to black */}
      <AbsoluteFill
        style={{
          background: '#000',
          opacity: fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};
