import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const STEPS = [
  { label: 'Phone rings', sub: 'Agent answers', emoji: '📞' },
  { label: 'lookup_lead', sub: 'Identifies caller', emoji: '🔍' },
  { label: 'recall_cognee', sub: 'Retrieves context', emoji: '🧠' },
  { label: 'Negotiation', sub: 'With guardrails', emoji: '🤝' },
  { label: 'Post-call', sub: 'Extract → Update DB → Learn', emoji: '💾' },
];

const GUARDRAILS = [
  { label: '≤10%', color: THEME.green, icon: '✓' },
  { label: '10-25%', color: THEME.yellow, icon: '⚠' },
  { label: '>25%', color: THEME.red, icon: '✗' },
];

export const InboundCallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const startY = 200;
  const stepSpacing = 150;

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
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.15,
          top: '20%',
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
        <span style={{ color: THEME.green }}>Inbound Call</span> Flow
      </div>

      {/* Flowchart */}
      <div
        style={{
          position: 'absolute',
          left: 460,
          top: startY,
        }}
      >
        {STEPS.map((step, i) => {
          const delay = 20 + i * 40;
          const stepScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIG,
          });
          const stepOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          // Arrow between steps
          const arrowDelay = delay + 20;
          const arrowOpacity = interpolate(
            frame,
            [arrowDelay, arrowDelay + 10],
            [0, 0.6],
            { extrapolateRight: 'clamp' }
          );
          const arrowHeight = interpolate(
            frame,
            [arrowDelay, arrowDelay + 15],
            [0, stepSpacing - 70],
            { extrapolateRight: 'clamp' }
          );

          return (
            <React.Fragment key={i}>
              {/* Step box */}
              <div
                style={{
                  position: 'absolute',
                  top: i * stepSpacing,
                  left: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  opacity: stepOpacity,
                  transform: `scale(${interpolate(stepScale, [0, 1], [0.9, 1])})`,
                }}
              >
                {/* Circle with emoji */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `${THEME.accent}15`,
                    border: `2px solid ${THEME.accent}50`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }}
                >
                  {step.emoji}
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: THEME.textPrimary,
                      fontFamily: MONO,
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: THEME.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {step.sub}
                  </div>
                </div>

                {/* Guardrails for negotiation step */}
                {i === 3 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      marginLeft: 20,
                    }}
                  >
                    {GUARDRAILS.map((g, gi) => {
                      const gDelay = delay + 15 + gi * 8;
                      const gOpacity = interpolate(
                        frame,
                        [gDelay, gDelay + 10],
                        [0, 1],
                        { extrapolateRight: 'clamp' }
                      );
                      return (
                        <div
                          key={gi}
                          style={{
                            opacity: gOpacity,
                            padding: '6px 14px',
                            borderRadius: 8,
                            background: `${g.color}18`,
                            border: `1px solid ${g.color}40`,
                            fontSize: 14,
                            fontFamily: MONO,
                            fontWeight: 600,
                            color: g.color,
                          }}
                        >
                          {g.label} {g.icon}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Arrow */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: i * stepSpacing + 65,
                    left: 29,
                    width: 2,
                    height: arrowHeight,
                    background: `linear-gradient(180deg, ${THEME.accent}60, ${THEME.accent}20)`,
                    opacity: arrowOpacity,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
