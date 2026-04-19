import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const DATASETS = [
  { name: 'lead_context', description: 'Customer interaction history', icon: '\u{1F4C1}', color: THEME.blue },
  { name: 'negotiation_brain', description: 'Deal strategies & patterns', icon: '\u{1F9E0}', color: THEME.accent },
  { name: 'brain_patterns', description: 'Learning from every call', icon: '\u{1F4CA}', color: THEME.purple },
  { name: 'product_knowledge', description: 'Specs, pricing & limits', icon: '\u{1F4E6}', color: THEME.green },
];

// Positions for 4 cards around the brain
const CARD_POSITIONS = [
  { x: 200, y: 260 },    // top-left
  { x: 1380, y: 260 },   // top-right
  { x: 200, y: 580 },    // bottom-left
  { x: 1380, y: 580 },   // bottom-right
];

export const BrainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const centerX = 960;
  const centerY = 480;

  const brainScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_CONFIG,
  });

  const brainPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  // Pulsing glow rings
  const ring1Opacity = interpolate(frame % 90, [0, 45, 90], [0.15, 0.3, 0.15]);
  const ring2Opacity = interpolate((frame + 30) % 90, [0, 45, 90], [0.1, 0.25, 0.1]);
  const ring3Opacity = interpolate((frame + 60) % 90, [0, 45, 90], [0.08, 0.2, 0.08]);

  const footerOpacity = interpolate(frame, [280, 310], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const footerY = interpolate(frame, [280, 310], [20, 0], {
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
          left: centerX - 450,
          top: centerY - 450,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 60%)`,
          opacity: 0.15,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(180,142,255,0.1) 0%, transparent 70%)`,
          opacity: 0.1,
          top: '5%',
          left: '5%',
        }}
      />

      {/* Neural network background dots */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0.06 }}
        width={1920}
        height={1080}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const dotX = 100 + (i % 10) * 190;
          const dotY = 150 + Math.floor(i / 10) * 280;
          return (
            <React.Fragment key={i}>
              <circle cx={dotX} cy={dotY} r={2} fill={THEME.textMuted} />
              {i % 3 === 0 && i < 27 && (
                <line
                  x1={dotX}
                  y1={dotY}
                  x2={100 + ((i + 3) % 10) * 190}
                  y2={150 + Math.floor((i + 3) / 10) * 280}
                  stroke={THEME.textMuted}
                  strokeWidth={0.5}
                />
              )}
            </React.Fragment>
          );
        })}
      </svg>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: 55,
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
        Memory Architecture
      </div>

      <div
        style={{
          position: 'absolute',
          top: 80,
          width: '100%',
          textAlign: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: THEME.textPrimary,
            letterSpacing: '-0.04em',
          }}
        >
          Self-Learning Memory via{' '}
          <span style={{ color: THEME.accent }}>Cognee</span>
        </div>
      </div>

      {/* Connecting lines from brain to cards */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0 }}
        width={1920}
        height={1080}
      >
        <defs>
          {DATASETS.map((ds, i) => (
            <linearGradient key={i} id={`brainLine-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.4} />
              <stop offset="100%" stopColor={ds.color} stopOpacity={0.2} />
            </linearGradient>
          ))}
        </defs>
        {DATASETS.map((_, i) => {
          const cardCenter = {
            x: CARD_POSITIONS[i].x + 170,
            y: CARD_POSITIONS[i].y + 45,
          };
          const delay = 30 + i * 20;
          const lineProgress = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={centerX + (cardCenter.x - centerX) * lineProgress}
              y2={centerY + (cardCenter.y - centerY) * lineProgress}
              stroke={`url(#brainLine-${i})`}
              strokeWidth={2}
              opacity={0.4 * lineProgress}
            />
          );
        })}
      </svg>

      {/* Pulsing glow rings */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 120,
          top: centerY - 120,
          width: 240,
          height: 240,
          borderRadius: '50%',
          border: `1px solid ${THEME.accent}`,
          opacity: ring1Opacity,
          transform: `scale(${brainScale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: centerX - 90,
          top: centerY - 90,
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: `1px solid ${THEME.accent}`,
          opacity: ring2Opacity,
          transform: `scale(${brainScale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: centerX - 160,
          top: centerY - 160,
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: `1px solid ${THEME.accent}`,
          opacity: ring3Opacity,
          transform: `scale(${brainScale})`,
        }}
      />

      {/* Central brain */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 55,
          top: centerY - 55,
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.accent}50, ${THEME.accent}15)`,
          border: `2px solid ${THEME.accent}60`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${brainScale * brainPulse})`,
          boxShadow: `0 0 60px ${THEME.accentGlow}`,
        }}
      >
        <div style={{ fontSize: 48 }}>{'\u{1F9E0}'}</div>
      </div>

      {/* Dataset cards */}
      {DATASETS.map((ds, i) => {
        const delay = 30 + i * 20;
        const cardScale = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: SPRING_CONFIG,
        });
        const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: CARD_POSITIONS[i].x,
              top: CARD_POSITIONS[i].y,
              width: 340,
              opacity: cardOpacity,
              transform: `scale(${interpolate(cardScale, [0, 1], [0.85, 1])})`,
              background: THEME.surface,
              borderRadius: 20,
              border: `1px solid ${ds.color}30`,
              boxShadow: `0 4px 24px ${ds.color}10, ${THEME.cardInnerHighlight}`,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${ds.color}12`,
                border: `1px solid ${ds.color}30`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 24,
                flexShrink: 0,
              }}
            >
              {ds.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: ds.color,
                  fontFamily: MONO,
                }}
              >
                {ds.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: THEME.textMuted,
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {ds.description}
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          width: '100%',
          textAlign: 'center',
          opacity: footerOpacity,
          transform: `translateY(${footerY}px)`,
          fontSize: 24,
          fontWeight: 500,
          color: THEME.textMuted,
          fontStyle: 'italic',
        }}
      >
        Every interaction makes the agent smarter.
      </div>
    </AbsoluteFill>
  );
};
