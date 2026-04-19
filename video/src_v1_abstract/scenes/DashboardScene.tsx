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
  { label: 'Active', value: '12', color: THEME.blue },
  { label: 'Won', value: '3', color: THEME.green },
  { label: 'Pipeline', value: '€48K', color: THEME.accent },
];

const BAR_DATA = [
  { label: 'Prospect', value: 0.3 },
  { label: 'Qualified', value: 0.55 },
  { label: 'Proposal', value: 0.75 },
  { label: 'Negotiation', value: 0.9 },
  { label: 'Won', value: 0.45 },
];

const DONUT_SEGMENTS = [
  { label: 'Prospect', pct: 25, color: THEME.blue },
  { label: 'Qualified', pct: 30, color: THEME.accent },
  { label: 'Proposal', pct: 20, color: THEME.yellow },
  { label: 'Won', pct: 25, color: THEME.green },
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
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.6 },
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
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.1,
          top: '5%',
          left: '25%',
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 44,
          fontWeight: 800,
          color: THEME.textPrimary,
        }}
      >
        <span style={{ color: THEME.accent }}>Command</span> Center
      </div>

      {/* Dashboard container */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 140,
          right: 140,
          bottom: 60,
          transform: `scale(${interpolate(dashScale, [0, 1], [0.95, 1])})`,
          opacity: interpolate(dashScale, [0, 0.5], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {/* KPI Cards Row */}
        <div
          style={{
            display: 'flex',
            gap: 28,
            marginBottom: 32,
          }}
        >
          {KPIS.map((kpi, i) => {
            const delay = 25 + i * 12;
            const kpiScale = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: SPRING_CONFIG,
            });
            const kpiOpacity = interpolate(
              frame,
              [delay, delay + 12],
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
                  borderRadius: THEME.cardRadius,
                  border: `1px solid ${THEME.border}`,
                  padding: '28px 32px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    color: kpi.color,
                    fontFamily: MONO,
                  }}
                >
                  {kpi.value}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: THEME.textMuted,
                    marginTop: 8,
                    fontWeight: 600,
                  }}
                >
                  {kpi.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div style={{ display: 'flex', gap: 28 }}>
          {/* Bar chart */}
          <div
            style={{
              flex: 1.5,
              background: THEME.surface,
              borderRadius: THEME.cardRadius,
              border: `1px solid ${THEME.border}`,
              padding: 32,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: THEME.textSecondary,
                marginBottom: 28,
              }}
            >
              Pipeline Value
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 20,
                height: 300,
              }}
            >
              {BAR_DATA.map((bar, i) => {
                const delay = 60 + i * 15;
                const barHeight = interpolate(
                  frame,
                  [delay, delay + 30],
                  [0, bar.value * 280],
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
                        height: barHeight,
                        borderRadius: 8,
                        background: `linear-gradient(180deg, ${THEME.accent}, ${THEME.accent}80)`,
                        boxShadow: `0 0 20px ${THEME.accent}20`,
                      }}
                    />
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 11,
                        fontFamily: MONO,
                        color: THEME.textMuted,
                        textAlign: 'center',
                      }}
                    >
                      {bar.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Donut chart */}
          <div
            style={{
              flex: 1,
              background: THEME.surface,
              borderRadius: THEME.cardRadius,
              border: `1px solid ${THEME.border}`,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: THEME.textSecondary,
                marginBottom: 28,
                alignSelf: 'flex-start',
              }}
            >
              Stage Distribution
            </div>

            {/* Donut via SVG */}
            <svg width={220} height={220} viewBox="0 0 220 220">
              {(() => {
                let cumulative = 0;
                const donutProgress = interpolate(
                  frame,
                  [80, 160],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                );

                return DONUT_SEGMENTS.map((seg, i) => {
                  const start = cumulative;
                  cumulative += seg.pct;
                  const circumference = 2 * Math.PI * 80;
                  const segLen = (seg.pct / 100) * circumference * donutProgress;
                  const offset = -(start / 100) * circumference;

                  return (
                    <circle
                      key={i}
                      cx={110}
                      cy={110}
                      r={80}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={24}
                      strokeDasharray={`${segLen} ${circumference}`}
                      strokeDashoffset={offset}
                      transform="rotate(-90 110 110)"
                      strokeLinecap="round"
                    />
                  );
                });
              })()}
            </svg>

            {/* Legend */}
            <div style={{ marginTop: 20, width: '100%' }}>
              {DONUT_SEGMENTS.map((seg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: seg.color,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 13,
                      color: THEME.textMuted,
                      fontFamily: MONO,
                    }}
                  >
                    {seg.label} ({seg.pct}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
