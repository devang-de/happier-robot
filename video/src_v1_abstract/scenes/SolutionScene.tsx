import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const NODES = [
  { label: 'Inbound Call', emoji: '📞', color: THEME.green },
  { label: 'Outbound Call', emoji: '📲', color: THEME.blue },
  { label: 'Inbound Email', emoji: '📩', color: THEME.purple },
  { label: 'Outbound Email', emoji: '📤', color: THEME.yellow },
  { label: 'Scheduler', emoji: '⏰', color: THEME.accent },
  { label: 'HITL', emoji: '🧑‍💼', color: THEME.red },
];

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const centerX = 960;
  const centerY = 560;
  const radius = 260;

  // Brain node
  const brainScale = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: SPRING_CONFIG,
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: FONT,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 400,
          top: centerY - 400,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          opacity: 0.3,
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 44,
          fontWeight: 800,
          color: THEME.textPrimary,
        }}
      >
        What if your AI agent could handle it{' '}
        <span style={{ color: THEME.accent }}>all</span>?
      </div>

      {/* Connection lines */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0 }}
        width={1920}
        height={1080}
      >
        {NODES.map((_, i) => {
          const angle = (i * 2 * Math.PI) / NODES.length - Math.PI / 2;
          const nx = centerX + radius * Math.cos(angle);
          const ny = centerY + radius * Math.sin(angle);
          const lineDelay = 40 + i * 12;
          const lineProgress = interpolate(
            frame,
            [lineDelay, lineDelay + 20],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={centerX + (nx - centerX) * lineProgress}
              y2={centerY + (ny - centerY) * lineProgress}
              stroke={THEME.accent}
              strokeWidth={2}
              opacity={0.4 * lineProgress}
            />
          );
        })}
      </svg>

      {/* Brain center node */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 55,
          top: centerY - 55,
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accent}40, ${THEME.accent}15)`,
          border: `3px solid ${THEME.accent}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${brainScale})`,
          boxShadow: `0 0 40px ${THEME.accent}30`,
        }}
      >
        <div style={{ fontSize: 36 }}>🧠</div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: THEME.accent,
            fontFamily: MONO,
          }}
        >
          Brain
        </div>
      </div>

      {/* Workflow nodes */}
      {NODES.map((node, i) => {
        const angle = (i * 2 * Math.PI) / NODES.length - Math.PI / 2;
        const nx = centerX + radius * Math.cos(angle);
        const ny = centerY + radius * Math.sin(angle);
        const delay = 25 + i * 12;
        const nodeScale = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: SPRING_CONFIG,
        });
        const nodeOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: nx - 52,
              top: ny - 52,
              width: 104,
              height: 104,
              borderRadius: '50%',
              background: `${node.color}18`,
              border: `2px solid ${node.color}60`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${nodeScale})`,
              opacity: nodeOpacity,
              boxShadow: `0 0 24px ${node.color}20`,
            }}
          >
            <div style={{ fontSize: 28 }}>{node.emoji}</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: node.color,
                fontFamily: MONO,
                textAlign: 'center',
                marginTop: 4,
                lineHeight: 1.1,
              }}
            >
              {node.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
