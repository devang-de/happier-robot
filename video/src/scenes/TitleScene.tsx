import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.6 },
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const subtitleY = interpolate(frame, [25, 45], [20, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const footerOpacity = interpolate(frame, [75, 95], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Glow pulse
  const glowSize = 300 + Math.sin(frame * 0.05) * 60;
  const glowOpacity = 0.25 + Math.sin(frame * 0.03) * 0.1;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.08} />

      {/* Central orange glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          width: glowSize * 4,
          height: glowSize * 2.5,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse, ${THEME.accent}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        }}
      />

      {/* Main title */}
      <div
        style={{
          position: 'absolute',
          top: '34%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${interpolate(titleScale, [0, 1], [0.3, 1])})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            fontFamily: FONT,
            color: THEME.textPrimary,
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          <span style={{ color: THEME.accent }}>Happier</span> Robot
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: `translate(-50%, ${subtitleY}px)`,
          opacity: subtitleOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            fontFamily: FONT,
            color: THEME.textSecondary,
            letterSpacing: '1px',
          }}
        >
          Autonomous AI Sales Agent
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          top: '58%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: taglineOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 400,
            fontFamily: FONT,
            color: THEME.textMuted,
            fontStyle: 'italic',
          }}
        >
          Follow a lead from first call to deal won
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: footerOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: FONT,
            color: THEME.textFaint,
          }}
        >
          Built at TUM.AI Hackathon · Powered by HappyRobot + Cognee
        </div>
      </div>
    </AbsoluteFill>
  );
};
