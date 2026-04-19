import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

interface WorkflowCard {
  icon: string;
  title: string;
  status: string;
  color: string;
  detail: string;
}

const WORKFLOWS: WorkflowCard[] = [
  { icon: '⏰', title: 'Scheduler', status: 'Every 15 min', color: THEME.accent, detail: 'Checking 8 leads for next actions...' },
  { icon: '📞', title: 'Inbound Calls', status: '3 active', color: THEME.blue, detail: 'BMW, Siemens, Deutsche Bank' },
  { icon: '📧', title: 'Email Engine', status: '12 sent today', color: THEME.green, detail: 'Follow-ups, proposals, confirmations' },
  { icon: '🔗', title: 'HITL Slack Bot', status: '2 pending', color: THEME.yellow, detail: 'Pricing query, legal review' },
  { icon: '📊', title: 'Pipeline Sync', status: 'Real-time', color: THEME.purple, detail: 'Twin DB ↔ Dashboard sync' },
  { icon: '🧠', title: 'Brain Learning', status: '47 patterns', color: THEME.accent, detail: 'Cognee knowledge graph growing' },
];

export const SystemMontageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.1} />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontSize: 14, color: THEME.accent, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 8 }}>
          The Full System
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: THEME.textPrimary, fontFamily: FONT }}>
          6 Workflows Running Autonomously
        </div>
      </div>

      {/* Workflow grid */}
      <div
        style={{
          position: 'absolute',
          top: 160,
          left: 100,
          right: 100,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
        }}
      >
        {WORKFLOWS.map((wf, i) => {
          const delay = 15 + i * 25;
          const f = Math.max(0, frame - delay);
          const scale = spring({ frame: f, fps, config: SPRING_CONFIG });
          const opacity = interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

          // Pulse activity indicator
          const pulse = Math.sin(frame * 0.08 + i * 1.5) * 0.3 + 0.7;

          return (
            <div
              key={i}
              style={{
                width: 280,
                padding: '24px 20px',
                background: THEME.cardBg,
                borderRadius: 20,
                border: `1px solid ${wf.color}20`,
                opacity,
                transform: `scale(${interpolate(scale, [0, 1], [0.9, 1])})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{wf.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: THEME.textPrimary, fontFamily: FONT }}>
                    {wf.title}
                  </div>
                  <div style={{ fontSize: 11, color: wf.color, fontFamily: MONO }}>
                    {wf.status}
                  </div>
                </div>
                {/* Activity indicator */}
                <div
                  style={{
                    marginLeft: 'auto',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: THEME.green,
                    opacity: pulse,
                    boxShadow: `0 0 8px ${THEME.green}60`,
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted, fontFamily: FONT, lineHeight: 1.5 }}>
                {wf.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 40,
          opacity: interpolate(frame, [170, 190], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        }}
      >
        {[
          { label: '6 Workflows', color: THEME.accent },
          { label: '50 Northstars', color: THEME.blue },
          { label: '100% Autonomous', color: THEME.green },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '10px 24px',
              borderRadius: 12,
              background: `${stat.color}10`,
              border: `1px solid ${stat.color}25`,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: stat.color, fontFamily: FONT }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
