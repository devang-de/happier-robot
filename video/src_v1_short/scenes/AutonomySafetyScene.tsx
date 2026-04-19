import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const SCHEDULER_STATS = [
  { value: '15min', label: 'Cycle Time' },
  { value: '24/7', label: 'Availability' },
  { value: '3x', label: 'More Touches' },
];

const SAFETY_METRICS = [
  { value: '25', label: 'Northstars', emoji: '\u2B50', color: THEME.accent },
  { value: '15', label: 'Adversarial Tests', emoji: '\u{1F6E1}\uFE0F', color: THEME.red },
  { value: '\u2264 10%', label: 'Max Discount', emoji: '\u{1F4B0}', color: THEME.green },
  { value: '100%', label: 'Claims Verified', emoji: '\u2705', color: THEME.blue },
  { value: '< 2s', label: 'Response Time', emoji: '\u26A1', color: THEME.yellow },
  { value: '0', label: 'Hallucinations', emoji: '\u{1F6AB}', color: THEME.purple },
];

export const AutonomySafetyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // Clock animation - rotating minute hand
  const clockRotation = interpolate(frame, [0, 450], [0, 360], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: FONT,
      }}
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.1,
          top: '10%',
          left: '20%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(107,179,255,0.08) 0%, transparent 70%)`,
          opacity: 0.08,
          bottom: '5%',
          right: '10%',
        }}
      />

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: 35,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          fontSize: 12,
          fontWeight: 500,
          color: THEME.textMuted,
          fontFamily: MONO,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.16em',
        }}
      >
        Reliability & Control
      </div>

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
          letterSpacing: '-0.04em',
        }}
      >
        <span style={{ color: THEME.accent }}>Autonomy</span> + Safety
      </div>

      {/* Two glass panels side by side */}
      {/* Left Panel: Scheduler */}
      {(() => {
        const panelDelay = 15;
        const panelOpacity = interpolate(frame, [panelDelay, panelDelay + 20], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const panelScale = spring({
          frame: Math.max(0, frame - panelDelay),
          fps,
          config: SPRING_CONFIG,
        });

        return (
          <div
            style={{
              position: 'absolute',
              left: 100,
              top: 180,
              width: 780,
              bottom: 80,
              opacity: panelOpacity,
              transform: `scale(${interpolate(panelScale, [0, 1], [0.95, 1])})`,
              background: THEME.surface,
              borderRadius: 20,
              border: THEME.cardBorder,
              boxShadow: THEME.cardInnerHighlight,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Clock icon with rotating hand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `${THEME.accent}12`,
                  border: `2px solid ${THEME.accent}30`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  boxShadow: `0 0 30px ${THEME.accentGlow}`,
                }}
              >
                {/* Clock face */}
                <svg width={50} height={50} viewBox="0 0 50 50">
                  <circle cx={25} cy={25} r={22} fill="none" stroke={`${THEME.accent}40`} strokeWidth={1.5} />
                  {/* Hour markers */}
                  {[0, 90, 180, 270].map((angle) => (
                    <line
                      key={angle}
                      x1={25 + 18 * Math.cos((angle * Math.PI) / 180)}
                      y1={25 + 18 * Math.sin((angle * Math.PI) / 180)}
                      x2={25 + 20 * Math.cos((angle * Math.PI) / 180)}
                      y2={25 + 20 * Math.sin((angle * Math.PI) / 180)}
                      stroke={THEME.accent}
                      strokeWidth={2}
                    />
                  ))}
                  {/* Minute hand */}
                  <line
                    x1={25}
                    y1={25}
                    x2={25 + 14 * Math.cos(((clockRotation - 90) * Math.PI) / 180)}
                    y2={25 + 14 * Math.sin(((clockRotation - 90) * Math.PI) / 180)}
                    stroke={THEME.accent}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <circle cx={25} cy={25} r={2.5} fill={THEME.accent} />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: THEME.textMuted,
                    fontFamily: MONO,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.16em',
                    marginBottom: 6,
                  }}
                >
                  Scheduler
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: THEME.accent,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Autonomous Cadence
                </div>
              </div>
            </div>

            {/* Scheduler stats row */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
              {SCHEDULER_STATS.map((stat, i) => {
                const sDelay = 35 + i * 12;
                const sOpacity = interpolate(frame, [sDelay, sDelay + 15], [0, 1], {
                  extrapolateRight: 'clamp',
                });
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      opacity: sOpacity,
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 14,
                      border: '1px solid rgba(255,255,255,0.06)',
                      padding: '16px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: THEME.accent,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: THEME.textMuted,
                        fontFamily: MONO,
                        marginTop: 4,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Task list */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: THEME.textMuted,
                fontFamily: MONO,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.16em',
                marginBottom: 14,
              }}
            >
              Auto-Managed Tasks
            </div>
            {['Follow-up calls', 'Email sequences', 'Lead re-engagement'].map((item, i) => {
              const iDelay = 55 + i * 12;
              const iOpacity = interpolate(frame, [iDelay, iDelay + 15], [0, 1], {
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: iOpacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: THEME.accent,
                      boxShadow: `0 0 8px ${THEME.accentGlow}`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 18,
                      color: THEME.textSecondary,
                    }}
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Right Panel: Safety / Quality Metrics */}
      {(() => {
        const panelDelay = 30;
        const panelOpacity = interpolate(frame, [panelDelay, panelDelay + 20], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const panelScale = spring({
          frame: Math.max(0, frame - panelDelay),
          fps,
          config: SPRING_CONFIG,
        });

        return (
          <div
            style={{
              position: 'absolute',
              right: 100,
              top: 180,
              width: 900,
              bottom: 80,
              opacity: panelOpacity,
              transform: `scale(${interpolate(panelScale, [0, 1], [0.95, 1])})`,
              background: THEME.surface,
              borderRadius: 20,
              border: THEME.cardBorder,
              boxShadow: THEME.cardInnerHighlight,
              padding: 40,
            }}
          >
            {/* Shield header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: `${THEME.blue}12`,
                  border: `2px solid ${THEME.blue}30`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 32,
                }}
              >
                {'\u{1F6E1}\uFE0F'}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: THEME.textMuted,
                    fontFamily: MONO,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.16em',
                    marginBottom: 6,
                  }}
                >
                  Quality Assurance
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: THEME.textPrimary,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Safety Guardrails
                </div>
              </div>
            </div>

            {/* 2x3 metric grid */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              {SAFETY_METRICS.map((metric, i) => {
                const mDelay = 50 + i * 15;
                const mScale = spring({
                  frame: Math.max(0, frame - mDelay),
                  fps,
                  config: SPRING_CONFIG,
                });
                const mOpacity = interpolate(
                  frame,
                  [mDelay, mDelay + 15],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={i}
                    style={{
                      width: 'calc(50% - 8px)',
                      opacity: mOpacity,
                      transform: `scale(${interpolate(mScale, [0, 1], [0.9, 1])})`,
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 14,
                      border: `1px solid ${metric.color}20`,
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                    }}
                  >
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{metric.emoji}</div>
                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: metric.color,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {metric.value}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: THEME.textMuted,
                          fontFamily: MONO,
                          marginTop: 2,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase' as const,
                        }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
