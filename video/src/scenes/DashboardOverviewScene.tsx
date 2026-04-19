import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT } from '../theme';
import { DashboardFrame } from '../components/DashboardFrame';
import { KPICard } from '../components/KPICard';
import { Cursor } from '../components/Cursor';

const ACTIVITY_ITEMS = [
  { icon: '📞', text: 'Inbound call from BMW — qualified', time: '2m ago', color: THEME.green },
  { icon: '📧', text: 'Follow-up email sent to Siemens', time: '15m ago', color: THEME.blue },
  { icon: '🤖', text: 'HITL query answered — pricing team', time: '1h ago', color: THEME.accent },
  { icon: '🎯', text: 'Demo scheduled with SAP', time: '2h ago', color: THEME.purple },
];

const STATUS_BAR = [
  { label: 'New', pct: 25, color: THEME.textMuted },
  { label: 'Qualified', pct: 25, color: THEME.blue },
  { label: 'Negotiation', pct: 37.5, color: THEME.yellow },
  { label: 'Won', pct: 12.5, color: THEME.green },
];

export const DashboardOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();

  const highlightNav = frame > 140 ? 'Leadbook' : undefined;

  return (
    <DashboardFrame activeNav="Dashboard" highlightNav={highlightNav}>
      <div style={{ padding: '40px 48px' }}>
        {/* Greeting */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: THEME.textSecondary,
            fontFamily: FONT,
            marginBottom: 32,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Good morning, <span style={{ fontWeight: 700, color: THEME.textPrimary }}>Devang</span>
        </div>

        {/* KPI cards */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
          <KPICard label="Active Leads" value="8" color={THEME.accent} delay={10} width={180} />
          <KPICard label="Won" value="1" color={THEME.green} delay={20} width={180} />
          <KPICard label="Pipeline" value="€48K" color={THEME.blue} delay={30} width={180} />
          <KPICard label="HITL Queries" value="3" color={THEME.purple} delay={40} width={180} />
        </div>

        {/* Status distribution */}
        <div
          style={{
            marginBottom: 36,
            opacity: interpolate(frame, [45, 65], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: THEME.textMuted,
              fontFamily: FONT,
              marginBottom: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Pipeline Distribution
          </div>
          <div
            style={{
              display: 'flex',
              height: 8,
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            {STATUS_BAR.map((s, i) => {
              const barWidth = interpolate(frame, [55 + i * 8, 75 + i * 8], [0, s.pct], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    width: `${barWidth}%`,
                    background: s.color,
                    borderRight: i < STATUS_BAR.length - 1 ? '2px solid rgba(0,0,0,0.3)' : 'none',
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
            {STATUS_BAR.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: s.color,
                  }}
                />
                <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: FONT }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div
          style={{
            opacity: interpolate(frame, [70, 90], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: THEME.textMuted,
              fontFamily: FONT,
              marginBottom: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Recent Activity
          </div>
          {ACTIVITY_ITEMS.map((item, i) => {
            const itemOpacity = interpolate(frame, [75 + i * 20, 90 + i * 20], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${THEME.border}`,
                  marginBottom: 6,
                  opacity: itemOpacity,
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT, flex: 1 }}>
                  {item.text}
                </span>
                <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: FONT }}>
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cursor animation */}
      {frame > 120 && (
        <Cursor
          fromX={800}
          fromY={400}
          toX={-140}
          toY={145}
          startFrame={120}
          duration={25}
          clickFrame={150}
        />
      )}
    </DashboardFrame>
  );
};
