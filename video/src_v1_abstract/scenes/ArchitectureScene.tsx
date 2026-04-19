import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

interface LayerDef {
  label: string;
  items: string[];
  color: string;
  y: number;
}

const LAYERS: LayerDef[] = [
  {
    label: 'Integrations',
    items: ['Slack', 'Gmail', 'Twilio'],
    color: THEME.textMuted,
    y: 780,
  },
  {
    label: 'HappyRobot Platform',
    items: [
      'Inbound Call',
      'Outbound Call',
      'Inbound Email',
      'Outbound Email',
      'Scheduler',
      'HITL',
    ],
    color: THEME.accent,
    y: 520,
  },
  {
    label: 'React Dashboard',
    items: ['Lead Management', 'Analytics', 'Controls'],
    color: THEME.blue,
    y: 260,
  },
];

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
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
          top: '15%',
          left: '30%',
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
          fontSize: 48,
          fontWeight: 800,
          color: THEME.textPrimary,
        }}
      >
        <span style={{ color: THEME.accent }}>Architecture</span>
      </div>

      {/* Layers (bottom to top animation) */}
      {LAYERS.map((layer, i) => {
        const reverseI = LAYERS.length - 1 - i; // animate bottom first
        const delay = 20 + reverseI * 40;
        const layerScale = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: SPRING_CONFIG,
        });
        const layerOpacity = interpolate(
          frame,
          [delay, delay + 15],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );
        const layerY = interpolate(
          frame,
          [delay, delay + 25],
          [40, 0],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 240,
              right: 240,
              top: layer.y,
              opacity: layerOpacity,
              transform: `translateY(${layerY}px) scale(${interpolate(layerScale, [0, 1], [0.95, 1])})`,
            }}
          >
            {/* Layer label */}
            <div
              style={{
                fontSize: 16,
                fontFamily: MONO,
                fontWeight: 700,
                color: layer.color,
                marginBottom: 12,
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              {layer.label}
            </div>

            {/* Layer box */}
            <div
              style={{
                background: THEME.surface,
                borderRadius: THEME.cardRadius,
                border: `1px solid ${layer.color}30`,
                padding: '20px 28px',
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              {layer.items.map((item, j) => {
                const itemDelay = delay + 10 + j * 6;
                const itemOpacity = interpolate(
                  frame,
                  [itemDelay, itemDelay + 10],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={j}
                    style={{
                      opacity: itemOpacity,
                      padding: '10px 18px',
                      background: `${layer.color}12`,
                      border: `1px solid ${layer.color}30`,
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 600,
                      color: THEME.textSecondary,
                      fontFamily: MONO,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Side boxes: Twin DB and Cognee Brain */}
      {/* Twin DB - Left */}
      {(() => {
        const delay = 140;
        const boxOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const boxX = interpolate(frame, [delay, delay + 25], [-30, 0], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 540,
              width: 150,
              opacity: boxOpacity,
              transform: `translateX(${boxX}px)`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `${THEME.blue}15`,
                border: `2px solid ${THEME.blue}50`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 32,
                margin: '0 auto 12px',
              }}
            >
              💾
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: MONO,
                fontWeight: 700,
                color: THEME.blue,
              }}
            >
              Twin DB
            </div>
          </div>
        );
      })()}

      {/* Cognee Brain - Right */}
      {(() => {
        const delay = 160;
        const boxOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const boxX = interpolate(frame, [delay, delay + 25], [30, 0], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            style={{
              position: 'absolute',
              right: 60,
              top: 540,
              width: 150,
              opacity: boxOpacity,
              transform: `translateX(${boxX}px)`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `${THEME.purple}15`,
                border: `2px solid ${THEME.purple}50`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 32,
                margin: '0 auto 12px',
              }}
            >
              🧠
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: MONO,
                fontWeight: 700,
                color: THEME.purple,
              }}
            >
              Cognee Brain
            </div>
          </div>
        );
      })()}

      {/* Connection lines */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        width={1920}
        height={1080}
      >
        {/* Vertical connectors between layers */}
        {[
          { y1: 370, y2: 510, delay: 100 },
          { y1: 630, y2: 770, delay: 120 },
        ].map((conn, i) => {
          const lineProgress = interpolate(
            frame,
            [conn.delay, conn.delay + 20],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          return (
            <line
              key={i}
              x1={960}
              y1={conn.y1}
              x2={960}
              y2={conn.y1 + (conn.y2 - conn.y1) * lineProgress}
              stroke={THEME.accent}
              strokeWidth={2}
              opacity={0.3 * lineProgress}
              strokeDasharray="6 4"
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
