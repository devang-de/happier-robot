import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, SPRING_CONFIG } from '../../src/theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: SPRING_CONFIG });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { ...SPRING_CONFIG, stiffness: 80 },
  });
  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [40, 60], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    frame,
    [0, 45, 90],
    [0.15, 0.3, 0.15],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONT,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: glowPulse,
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          fontSize: 96,
          fontWeight: 800,
          color: THEME.textPrimary,
          letterSpacing: -2,
          textAlign: 'center',
        }}
      >
        Happier Robot
      </div>

      {/* Accent underline */}
      <div
        style={{
          width: interpolate(frame, [10, 30], [0, 300], {
            extrapolateRight: 'clamp',
          }),
          height: 4,
          background: THEME.accent,
          borderRadius: 2,
          marginTop: 16,
          opacity: titleOpacity,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
          opacity: subtitleOpacity,
          fontSize: 36,
          fontWeight: 500,
          color: THEME.textSecondary,
          marginTop: 32,
          textAlign: 'center',
        }}
      >
        Autonomous AI Sales Agent with a Brain
      </div>

      {/* Tagline */}
      <div
        style={{
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          fontSize: 22,
          fontWeight: 400,
          color: THEME.textMuted,
          marginTop: 24,
          textAlign: 'center',
        }}
      >
        Built at TUM.AI Hackathon · Powered by HappyRobot + Cognee
      </div>
    </AbsoluteFill>
  );
};
