import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: SPRING_CONFIG });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
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

  const dividerWidth = interpolate(frame, [12, 35], [0, 400], {
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [45, 65], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const footerOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.08, 0.15, 0.08],
    { extrapolateRight: 'clamp' }
  );

  const glowPulse2 = interpolate(
    (frame + 30) % 90,
    [0, 45, 90],
    [0.06, 0.12, 0.06],
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
      {/* Ambient glow blob 1 - orange, top-right */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,152,47,0.15) 0%, transparent 70%)`,
          opacity: glowPulse,
          top: -200,
          right: -150,
        }}
      />

      {/* Ambient glow blob 2 - blue, bottom-left */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(107,179,255,0.12) 0%, transparent 70%)`,
          opacity: glowPulse2,
          bottom: -200,
          left: -100,
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
          letterSpacing: '-0.04em',
          textAlign: 'center',
          textShadow: '0 0 60px rgba(255,152,47,0.3)',
        }}
      >
        Happier Robot
      </div>

      {/* Horizontal divider */}
      <div
        style={{
          width: dividerWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${THEME.accent}, transparent)`,
          marginTop: 20,
          opacity: titleOpacity,
        }}
      />

      {/* Subtitle - IBM Plex Mono, uppercase, wide tracking */}
      <div
        style={{
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
          opacity: subtitleOpacity,
          fontSize: 18,
          fontWeight: 500,
          color: THEME.textMuted,
          marginTop: 28,
          textAlign: 'center',
          fontFamily: MONO,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.16em',
        }}
      >
        Autonomous AI Sales Agent with a Brain
      </div>

      {/* Tagline */}
      <div
        style={{
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          fontSize: 28,
          fontWeight: 600,
          color: THEME.textSecondary,
          marginTop: 40,
          textAlign: 'center',
        }}
      >
        Built at <span style={{ color: THEME.accent }}>TUM.AI</span> Hackathon
      </div>

      {/* Footer credits with dot separators */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          opacity: footerOpacity,
          fontSize: 14,
          fontWeight: 500,
          color: THEME.textMuted,
          fontFamily: MONO,
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span>TUM.AI Hackathon</span>
        <span style={{ color: THEME.accent, fontSize: 8 }}>{'\u25CF'}</span>
        <span>HappyRobot</span>
        <span style={{ color: THEME.accent, fontSize: 8 }}>{'\u25CF'}</span>
        <span>Cognee</span>
      </div>
    </AbsoluteFill>
  );
};
