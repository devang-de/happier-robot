import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const EMAIL_STEPS = [
  { label: 'Email arrives', emoji: '📩' },
  { label: 'AI reads & classifies', emoji: '🤖' },
  { label: 'Draft reply or escalate', emoji: '📝' },
];

const HITL_STEPS = [
  { label: 'Question identified', emoji: '❓' },
  { label: 'Sent to Slack', emoji: '💬' },
  { label: 'Human answers', emoji: '🧑‍💼' },
  { label: 'Delivered to lead', emoji: '✉️' },
];

const FlowColumn: React.FC<{
  title: string;
  titleColor: string;
  steps: { label: string; emoji: string }[];
  frame: number;
  fps: number;
  baseDelay: number;
  left: number;
}> = ({ title, titleColor, steps, frame, fps, baseDelay, left }) => {
  const titleOpacity = interpolate(frame, [baseDelay, baseDelay + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: 200,
        width: 420,
      }}
    >
      {/* Column title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 28,
          fontWeight: 800,
          color: titleColor,
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        {title}
      </div>

      {/* Steps */}
      {steps.map((step, i) => {
        const delay = baseDelay + 15 + i * 30;
        const stepScale = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: SPRING_CONFIG,
        });
        const stepOpacity = interpolate(
          frame,
          [delay, delay + 12],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );
        const arrowDelay = delay + 15;
        const arrowOpacity = interpolate(
          frame,
          [arrowDelay, arrowDelay + 10],
          [0, 0.5],
          { extrapolateRight: 'clamp' }
        );

        return (
          <React.Fragment key={i}>
            <div
              style={{
                opacity: stepOpacity,
                transform: `scale(${interpolate(stepScale, [0, 1], [0.9, 1])})`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                background: THEME.surface,
                borderRadius: THEME.cardRadius / 2,
                border: `1px solid ${THEME.border}`,
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 28 }}>{step.emoji}</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: THEME.textPrimary,
                  fontFamily: MONO,
                }}
              >
                {step.label}
              </div>
            </div>

            {/* Arrow */}
            {i < steps.length - 1 && (
              <div
                style={{
                  opacity: arrowOpacity,
                  textAlign: 'center',
                  fontSize: 20,
                  color: THEME.accent,
                  margin: '4px 0',
                }}
              >
                ↓
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const EmailHITLScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // Divider
  const dividerHeight = interpolate(frame, [30, 80], [0, 500], {
    extrapolateRight: 'clamp',
  });

  // Footer
  const footerOpacity = interpolate(frame, [220, 250], [0, 1], {
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
          top: '10%',
          left: '30%',
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 44,
          fontWeight: 800,
          color: THEME.textPrimary,
        }}
      >
        Email &{' '}
        <span style={{ color: THEME.accent }}>Human-in-the-Loop</span>
      </div>

      {/* Center divider */}
      <div
        style={{
          position: 'absolute',
          left: 959,
          top: 200,
          width: 2,
          height: dividerHeight,
          background: `linear-gradient(180deg, ${THEME.accent}40, transparent)`,
        }}
      />

      {/* Left: Email flow */}
      <FlowColumn
        title="📩 Inbound Email"
        titleColor={THEME.purple}
        steps={EMAIL_STEPS}
        frame={frame}
        fps={fps}
        baseDelay={15}
        left={280}
      />

      {/* Right: HITL flow */}
      <FlowColumn
        title="🧑‍💼 HITL Loop"
        titleColor={THEME.accent}
        steps={HITL_STEPS}
        frame={frame}
        fps={fps}
        baseDelay={60}
        left={1220}
      />

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          width: '100%',
          textAlign: 'center',
          opacity: footerOpacity,
          fontSize: 28,
          fontWeight: 600,
          color: THEME.textMuted,
        }}
      >
        Human expertise +{' '}
        <span style={{ color: THEME.accent }}>AI speed</span>
      </div>
    </AbsoluteFill>
  );
};
