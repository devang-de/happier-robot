import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

interface GraphNode {
  x: number;
  y: number;
  label: string;
  color: string;
  r: number;
  delay: number;
}

const NODES: GraphNode[] = [
  { x: 480, y: 280, label: 'Agent Brain', color: THEME.accent, r: 32, delay: 10 },
  { x: 250, y: 160, label: 'Insurance', color: THEME.blue, r: 24, delay: 30 },
  { x: 700, y: 160, label: 'Pricing', color: THEME.yellow, r: 24, delay: 50 },
  { x: 250, y: 400, label: 'Legal', color: THEME.purple, r: 24, delay: 65 },
  { x: 700, y: 400, label: 'Competitors', color: THEME.red, r: 24, delay: 80 },
  { x: 120, y: 280, label: 'BaFin DPA', color: THEME.purple, r: 18, delay: 95 },
  { x: 840, y: 280, label: '15% max', color: THEME.yellow, r: 18, delay: 110 },
  { x: 480, y: 100, label: 'Claims AI', color: THEME.green, r: 18, delay: 125 },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [2, 6], [1, 7], [3, 5], [4, 6],
];

const LEARNINGS = [
  { text: 'Insurance companies need BaFin-compliant DPA', frame: 110, color: THEME.purple },
  { text: 'Enterprise 3-year deals: max 15% with dedicated CSM', frame: 155, color: THEME.yellow },
  { text: 'Competitors quoting 25% -> ask for written evidence', frame: 200, color: THEME.red },
];

export const BrainLearnsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Search query appears at frame 220
  const searchFrame = 235;
  const searchVisible = frame >= searchFrame;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.08} accentColor={THEME.purple} />

      <div style={{ display: 'flex', height: '100%' }}>
        {/* LEFT: Graph */}
        <div style={{ width: '55%', position: 'relative', padding: '24px' }}>
          {/* Title */}
          <div
            style={{
              fontSize: 14,
              color: THEME.accent,
              fontFamily: MONO,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: 8,
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            Agent Brain
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: THEME.textPrimary,
              fontFamily: FONT,
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            Knowledge Graph
          </div>

          {/* SVG Graph */}
          <svg
            width={960}
            height={500}
            style={{ position: 'absolute', top: 80, left: 0 }}
          >
            {/* Edges */}
            {EDGES.map(([from, to], i) => {
              const maxDelay = Math.max(NODES[from].delay, NODES[to].delay);
              const edgeOpacity = interpolate(frame, [maxDelay + 5, maxDelay + 20], [0, 0.25], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              });
              // Pulse
              const pulse = 0.25 + Math.sin(frame * 0.03 + i) * 0.08;
              return (
                <line
                  key={i}
                  x1={NODES[from].x}
                  y1={NODES[from].y}
                  x2={NODES[to].x}
                  y2={NODES[to].y}
                  stroke={NODES[from].color}
                  strokeWidth={1.5}
                  opacity={edgeOpacity > 0 ? pulse : 0}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const f = Math.max(0, frame - node.delay);
              const nodeScale = spring({ frame: f, fps, config: SPRING_CONFIG });
              const nodeOpacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

              return (
                <g key={i} opacity={nodeOpacity}>
                  {/* Glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 8}
                    fill={`${node.color}10`}
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r * interpolate(nodeScale, [0, 1], [0.3, 1])}
                    fill={`${node.color}25`}
                    stroke={node.color}
                    strokeWidth={2}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={THEME.textPrimary}
                    fontSize={node.r > 20 ? 11 : 9}
                    fontFamily="Manrope"
                    fontWeight={600}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* RIGHT: Learnings + search */}
        <div
          style={{
            flex: 1,
            borderLeft: `1px solid ${THEME.border}`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: THEME.textPrimary, fontFamily: FONT, marginBottom: 20 }}>
            Every deal makes the agent smarter
          </div>

          {/* Learned patterns */}
          {LEARNINGS.map((item, i) => {
            if (frame < item.frame) return null;
            const f = frame - item.frame;
            const opacity = interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
            return (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}20`,
                  borderRadius: 12,
                  marginBottom: 10,
                  opacity,
                  transform: `translateX(${interpolate(opacity, [0, 1], [15, 0])}px)`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14 }}>💡</span>
                  <span style={{ fontSize: 10, color: item.color, fontFamily: MONO, fontWeight: 600, textTransform: 'uppercase' }}>
                    New Pattern
                  </span>
                </div>
                <div style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT, lineHeight: 1.5 }}>
                  {item.text}
                </div>
              </div>
            );
          })}

          {/* Search query */}
          {searchVisible && (
            <div
              style={{
                marginTop: 'auto',
                opacity: interpolate(frame - searchFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <div style={{ fontSize: 12, color: THEME.textFaint, fontFamily: MONO, marginBottom: 8 }}>
                recall_cognee search:
              </div>
              <div
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 10,
                  fontSize: 13,
                  color: THEME.textPrimary,
                  fontFamily: FONT,
                  fontStyle: 'italic',
                  marginBottom: 12,
                }}
              >
                "What do we know about insurance deals?"
              </div>
              {frame >= searchFrame + 20 && (
                <div
                  style={{
                    padding: '10px 16px',
                    background: `${THEME.green}08`,
                    border: `1px solid ${THEME.green}20`,
                    borderRadius: 10,
                    fontSize: 12,
                    color: THEME.textSecondary,
                    fontFamily: FONT,
                    lineHeight: 1.6,
                    opacity: interpolate(frame - searchFrame - 20, [0, 18], [0, 1], { extrapolateRight: 'clamp' }),
                  }}
                >
                  <strong style={{ color: THEME.green }}>3 results:</strong> BaFin DPA requirement, 15% max discount with CSM, competitor evidence strategy
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
