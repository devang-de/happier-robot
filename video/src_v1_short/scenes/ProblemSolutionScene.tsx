import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const PROBLEMS = [
  { text: 'Qualifying leads manually', emoji: '\u{1F50D}' },
  { text: 'Writing follow-up emails', emoji: '\u{1F4E7}' },
  { text: 'Tracking open questions', emoji: '\u{1F4CB}' },
  { text: 'Scheduling callbacks', emoji: '\u{1F4C5}' },
];

const NODES = [
  { label: 'Inbound Call', emoji: '\u{1F4DE}', color: THEME.green },
  { label: 'Outbound Call', emoji: '\u{1F4F2}', color: THEME.blue },
  { label: 'Inbound Email', emoji: '\u{1F4E9}', color: THEME.purple },
  { label: 'Outbound Email', emoji: '\u{1F4E4}', color: THEME.yellow },
  { label: 'Scheduler', emoji: '\u23F0', color: THEME.accent },
  { label: 'HITL', emoji: '\u{1F9D1}\u200D\u{1F4BC}', color: THEME.red },
];

export const ProblemSolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase2Start = 200;

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const phase1Opacity = interpolate(frame, [175, 210], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const phase2Opacity = interpolate(frame, [phase2Start, phase2Start + 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const solutionHeadlineY = interpolate(frame, [phase2Start, phase2Start + 25], [30, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const centerX = 960;
  const centerY = 560;
  const radius = 260;

  const brainScale = spring({
    frame: Math.max(0, frame - phase2Start - 10),
    fps,
    config: SPRING_CONFIG,
  });

  const brainPulse = interpolate(
    (frame - phase2Start) % 60,
    [0, 30, 60],
    [1, 1.04, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: FONT,
      }}
    >
      {/* Phase 1: Problem */}
      <div style={{ opacity: phase1Opacity, position: 'absolute', inset: 0 }}>
        {/* Ambient glow - red */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,139,130,0.1) 0%, transparent 70%)`,
            opacity: 0.12,
            top: '5%',
            right: '5%',
          }}
        />
        {/* Ambient glow - blue */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(107,179,255,0.08) 0%, transparent 70%)`,
            opacity: 0.1,
            bottom: '10%',
            left: '5%',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: 900, padding: 60 }}>
            {/* Label */}
            <div
              style={{
                opacity: headlineOpacity,
                fontSize: 12,
                fontWeight: 500,
                color: THEME.textMuted,
                fontFamily: MONO,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.16em',
                marginBottom: 16,
              }}
            >
              The Problem
            </div>

            <div
              style={{
                opacity: headlineOpacity,
                transform: `translateY(${headlineY}px)`,
                fontSize: 48,
                fontWeight: 800,
                color: THEME.textPrimary,
                marginBottom: 50,
                lineHeight: 1.2,
                letterSpacing: '-0.04em',
              }}
            >
              Sales teams spend{' '}
              <span style={{ color: THEME.red }}>70%</span> of time
              <br />
              on repetitive tasks
            </div>

            {/* Problem card with left orange border */}
            <div
              style={{
                background: THEME.surface,
                borderRadius: 20,
                border: THEME.cardBorder,
                borderLeft: `3px solid ${THEME.accent}`,
                boxShadow: THEME.cardInnerHighlight,
                padding: '28px 36px',
              }}
            >
              {PROBLEMS.map((problem, i) => {
                const delay = 25 + i * 18;
                const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
                  extrapolateRight: 'clamp',
                });
                const itemX = interpolate(frame, [delay, delay + 18], [-30, 0], {
                  extrapolateRight: 'clamp',
                });

                return (
                  <div
                    key={i}
                    style={{
                      opacity: itemOpacity,
                      transform: `translateX(${itemX}px)`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      marginBottom: i < PROBLEMS.length - 1 ? 20 : 0,
                    }}
                  >
                    <div style={{ fontSize: 24, flexShrink: 0 }}>
                      {problem.emoji}
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 500,
                        color: THEME.textSecondary,
                      }}
                    >
                      {problem.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Phase 2: Solution */}
      <div style={{ opacity: phase2Opacity, position: 'absolute', inset: 0 }}>
        {/* Ambient glow - orange center */}
        <div
          style={{
            position: 'absolute',
            left: centerX - 400,
            top: centerY - 400,
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
            opacity: 0.2,
          }}
        />
        {/* Ambient glow - blue */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(107,179,255,0.08) 0%, transparent 70%)`,
            opacity: 0.1,
            top: '5%',
            right: '5%',
          }}
        />

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: 50,
            width: '100%',
            textAlign: 'center',
            opacity: phase2Opacity,
            fontSize: 12,
            fontWeight: 500,
            color: THEME.textMuted,
            fontFamily: MONO,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.16em',
          }}
        >
          The Solution
        </div>

        <div
          style={{
            position: 'absolute',
            top: 80,
            width: '100%',
            textAlign: 'center',
            opacity: phase2Opacity,
            transform: `translateY(${solutionHeadlineY}px)`,
            fontSize: 44,
            fontWeight: 800,
            color: THEME.textPrimary,
            letterSpacing: '-0.04em',
          }}
        >
          <span style={{ color: THEME.accent }}>6 Workflows</span> — One Brain
        </div>

        {/* Connecting lines */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0 }}
          width={1920}
          height={1080}
        >
          <defs>
            {NODES.map((node, i) => (
              <linearGradient key={`grad-${i}`} id={`lineGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.5} />
                <stop offset="100%" stopColor={node.color} stopOpacity={0.3} />
              </linearGradient>
            ))}
          </defs>
          {NODES.map((_, i) => {
            const angle = (i * 2 * Math.PI) / NODES.length - Math.PI / 2;
            const nx = centerX + radius * Math.cos(angle);
            const ny = centerY + radius * Math.sin(angle);
            const lineDelay = phase2Start + 30 + i * 10;
            const lineProgress = interpolate(
              frame,
              [lineDelay, lineDelay + 18],
              [0, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={centerX + (nx - centerX) * lineProgress}
                y2={centerY + (ny - centerY) * lineProgress}
                stroke={`url(#lineGrad-${i})`}
                strokeWidth={2}
                opacity={0.5 * lineProgress}
              />
            );
          })}
        </svg>

        {/* Central brain node */}
        <div
          style={{
            position: 'absolute',
            left: centerX - 55,
            top: centerY - 55,
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${THEME.accent}40, ${THEME.accent}10)`,
            border: `2px solid ${THEME.accent}60`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${brainScale * brainPulse})`,
            boxShadow: `0 0 50px ${THEME.accentGlow}, ${THEME.cardInnerHighlight}`,
          }}
        >
          <div style={{ fontSize: 36 }}>{'\u{1F9E0}'}</div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: THEME.accent,
              fontFamily: MONO,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              marginTop: 2,
            }}
          >
            Brain
          </div>
        </div>

        {/* Workflow nodes - glass circles */}
        {NODES.map((node, i) => {
          const angle = (i * 2 * Math.PI) / NODES.length - Math.PI / 2;
          const nx = centerX + radius * Math.cos(angle);
          const ny = centerY + radius * Math.sin(angle);
          const delay = phase2Start + 25 + i * 10;
          const nodeScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: SPRING_CONFIG,
          });
          const nodeOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
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
                background: `rgba(255,255,255,0.03)`,
                border: `2px solid ${node.color}50`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `scale(${nodeScale})`,
                opacity: nodeOpacity,
                boxShadow: `0 0 30px ${node.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <div style={{ fontSize: 28 }}>{node.emoji}</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: node.color,
                  fontFamily: MONO,
                  textAlign: 'center',
                  marginTop: 4,
                  lineHeight: 1.1,
                  letterSpacing: '0.05em',
                }}
              >
                {node.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
