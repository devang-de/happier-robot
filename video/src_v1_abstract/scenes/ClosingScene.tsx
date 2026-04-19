import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, SPRING_CONFIG } from '../../src/theme';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const line1Opacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const line1Y = interpolate(frame, [20, 40], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const line2Opacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const line2Y = interpolate(frame, [35, 55], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const line3Opacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const line3Y = interpolate(frame, [50, 70], [20, 0], {
    extrapolateRight: 'clamp',
  });

  // Fade out everything at end
  const fadeOut = interpolate(frame, [140, 180], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.15, 0.25, 0.15]
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

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          fontSize: 72,
          fontWeight: 800,
          color: THEME.textPrimary,
          letterSpacing: -1.5,
          marginBottom: 8,
        }}
      >
        Happier Robot
      </div>

      {/* Accent line */}
      <div
        style={{
          width: interpolate(frame, [5, 25], [0, 200], {
            extrapolateRight: 'clamp',
          }),
          height: 3,
          background: THEME.accent,
          borderRadius: 2,
          marginBottom: 40,
          opacity: logoOpacity,
        }}
      />

      {/* Line 1 */}
      <div
        style={{
          opacity: line1Opacity,
          transform: `translateY(${line1Y}px)`,
          fontSize: 26,
          fontWeight: 600,
          color: THEME.textSecondary,
          marginBottom: 12,
        }}
      >
        Built at TUM.AI Hackathon 2025
      </div>

      {/* Line 2 */}
      <div
        style={{
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
          fontSize: 22,
          fontWeight: 500,
          color: THEME.textMuted,
          marginBottom: 12,
        }}
      >
        Powered by HappyRobot + Cognee
      </div>

      {/* Line 3 */}
      <div
        style={{
          opacity: line3Opacity,
          transform: `translateY(${line3Y}px)`,
          fontSize: 20,
          fontWeight: 500,
          color: THEME.accent,
          marginTop: 20,
        }}
      >
        Devang Dhumal
      </div>
    </AbsoluteFill>
  );
};
