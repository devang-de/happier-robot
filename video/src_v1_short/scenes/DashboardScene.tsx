import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const KPIS = [
  { label: 'Active Leads', value: '12', delta: '+3', deltaUp: true, color: THEME.blue },
  { label: 'Deals Won', value: '3', delta: '+1', deltaUp: true, color: THEME.green },
  { label: 'Pipeline', value: '\u20AC48K', delta: '+12%', deltaUp: true, color: THEME.accent },
];

const BAR_DATA = [
  { label: 'Prospect', value: 0.3 },
  { label: 'Qualified', value: 0.55 },
  { label: 'Proposal', value: 0.75 },
  { label: 'Negotiation', value: 0.9 },
  { label: 'Won', value: 0.45 },
];

const NAV_DOTS = [
  { color: THEME.accent, label: 'Dashboard' },
  { color: THEME.blue, label: 'Leads' },
  { color: THEME.green, label: 'Deals' },
  { color: THEME.purple, label: 'Reports' },
  { color: THEME.textMuted, label: 'Settings' },
];

export const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const dashScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.6 },
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
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.08,
          top: '5%',
          left: '25%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(107,179,255,0.08) 0%, transparent 70%)`,
          opacity: 0.06,
          bottom: '10%',
          right: '5%',
        }}
      />

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: 30,
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
        Live Interface
      </div>

      <div
        style={{
          position: 'absolute',
          top: 55,
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
        <span style={{ color: THEME.accent }}>Command</span> Center
      </div>

      {/* Browser window frame */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 120,
          right: 120,
          bottom: 50,
          transform: `scale(${interpolate(dashScale, [0, 1], [0.95, 1])})`,
          opacity: interpolate(dashScale, [0, 0.5], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          borderRadius: 16,
          border: THEME.cardBorder,
          overflow: 'hidden',
          background: THEME.bgDeep,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), ${THEME.cardInnerHighlight}`,
        }}
      >
        {/* Browser title bar */}
        <div
          style={{
            height: 40,
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div
            style={{
              marginLeft: 20,
              fontSize: 12,
              color: THEME.textMuted,
              fontFamily: MONO,
              letterSpacing: '0.05em',
            }}
          >
            happierrobot.ai/dashboard
          </div>
        </div>

        {/* Dashboard content area */}
        <div style={{ display: 'flex', height: 'calc(100% - 40px)' }}>
          {/* Sidebar */}
          <div
            style={{
              width: 60,
              background: 'rgba(255,255,255,0.02)',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              padding: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            {NAV_DOTS.map((dot, i) => {
              const dDelay = 20 + i * 6;
              const dOpacity = interpolate(frame, [dDelay, dDelay + 10], [0, 1], {
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: dOpacity,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: i === 0 ? `${dot.color}15` : 'transparent',
                    border: i === 0 ? `1px solid ${dot.color}30` : '1px solid transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: dot.color,
                      opacity: i === 0 ? 1 : 0.4,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Main dashboard content */}
          <div style={{ flex: 1, padding: 28 }}>
            {/* KPI Cards */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
              {KPIS.map((kpi, i) => {
                const delay = 25 + i * 12;
                const kpiScale = spring({
                  frame: Math.max(0, frame - delay),
                  fps,
                  config: SPRING_CONFIG,
                });
                const kpiOpacity = interpolate(
                  frame,
                  [delay, delay + 15],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      opacity: kpiOpacity,
                      transform: `scale(${interpolate(kpiScale, [0, 1], [0.9, 1])})`,
                      background: THEME.surface,
                      borderRadius: 16,
                      border: THEME.cardBorder,
                      padding: '24px 28px',
                      boxShadow: THEME.cardInnerHighlight,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: THEME.textMuted,
                          fontFamily: MONO,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.12em',
                        }}
                      >
                        {kpi.label}
                      </div>
                      {/* Delta badge */}
                      <div
                        style={{
                          padding: '2px 8px',
                          borderRadius: 8,
                          background: `${THEME.green}15`,
                          border: `1px solid ${THEME.green}30`,
                          fontSize: 11,
                          fontFamily: MONO,
                          fontWeight: 600,
                          color: THEME.green,
                        }}
                      >
                        {kpi.delta}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 800,
                        color: kpi.color,
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {kpi.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bar chart */}
            <div
              style={{
                background: THEME.surface,
                borderRadius: 16,
                border: THEME.cardBorder,
                padding: 28,
                boxShadow: THEME.cardInnerHighlight,
                height: 'calc(100% - 140px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: THEME.textSecondary,
                  }}
                >
                  Pipeline Value
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: THEME.textMuted,
                    fontFamily: MONO,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  Last 30 days
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 20,
                  height: 'calc(100% - 50px)',
                }}
              >
                {BAR_DATA.map((bar, i) => {
                  const delay = 45 + i * 14;
                  const barHeight = interpolate(
                    frame,
                    [delay, delay + 30],
                    [0, bar.value * 100],
                    { extrapolateRight: 'clamp' }
                  );

                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: `${barHeight}%`,
                          borderRadius: 8,
                          background: `linear-gradient(180deg, ${THEME.accent}, ${THEME.accent}60)`,
                          boxShadow: `0 0 20px ${THEME.accentGlow}`,
                          minHeight: barHeight > 0 ? 4 : 0,
                        }}
                      />
                      <div
                        style={{
                          marginTop: 10,
                          fontSize: 11,
                          fontFamily: MONO,
                          color: THEME.textMuted,
                          textAlign: 'center',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {bar.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
