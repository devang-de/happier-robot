import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../theme';
import { GradientBackground } from '../components/GradientBackground';
import { KPICard } from '../components/KPICard';
import { Particles } from '../components/Particles';

const KANBAN_COLS = [
  {
    title: 'Qualified',
    color: THEME.blue,
    cards: [{ name: 'Siemens', contact: 'L. Fischer' }],
  },
  {
    title: 'Negotiation',
    color: THEME.yellow,
    cards: [{ name: 'BMW', contact: 'M. Weber' }],
  },
  {
    title: 'Won',
    color: THEME.green,
    cards: [{ name: 'SAP', contact: 'T. Schmidt', value: '€48K' }],
  },
];

export const DealWonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Allianz card moves from negotiation -> won at frame 60
  const moveFrame = 60;
  const moveProgress = frame >= moveFrame
    ? interpolate(frame - moveFrame, [0, 30], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  const confettiFrame = 95;
  const celebrationOpacity = frame >= confettiFrame
    ? interpolate(frame - confettiFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  const kpiUpdateFrame = 130;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.08} accentColor={THEME.green} />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontSize: 14, color: THEME.accent, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 8 }}>
          Pipeline View
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: THEME.textPrimary, fontFamily: FONT }}>
          Deal Won
        </div>
      </div>

      {/* Kanban */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 100,
          right: 100,
          display: 'flex',
          gap: 24,
          opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {KANBAN_COLS.map((col, colIdx) => (
          <div key={colIdx} style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, padding: '0 4px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: col.color, fontFamily: FONT, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {col.title}
              </span>
            </div>

            {/* Existing cards */}
            {col.cards.map((card, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textPrimary, fontFamily: FONT }}>
                  {card.name}
                </div>
                <div style={{ fontSize: 11, color: THEME.textMuted, fontFamily: FONT, marginTop: 2 }}>
                  {card.contact}
                </div>
                {'value' in card && card.value && (
                  <div style={{ fontSize: 11, color: col.color, fontFamily: FONT, marginTop: 4, fontWeight: 600 }}>
                    {card.value}
                  </div>
                )}
              </div>
            ))}

            {/* Allianz card - in negotiation, disappears */}
            {colIdx === 1 && moveProgress < 0.5 && (
              <div
                style={{
                  padding: '12px 14px',
                  background: `linear-gradient(135deg, ${THEME.yellow}10, ${THEME.yellow}05)`,
                  border: `1px solid ${THEME.yellow}25`,
                  borderRadius: 12,
                  marginBottom: 8,
                  opacity: interpolate(moveProgress, [0, 0.4], [1, 0], { extrapolateRight: 'clamp' }),
                  transform: `scale(${interpolate(moveProgress, [0, 0.4], [1, 0.8], { extrapolateRight: 'clamp' })})`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textPrimary, fontFamily: FONT }}>
                  Allianz
                </div>
                <div style={{ fontSize: 11, color: THEME.textMuted, fontFamily: FONT, marginTop: 2 }}>
                  Devang Patel
                </div>
                <div style={{ fontSize: 11, color: THEME.yellow, fontFamily: FONT, marginTop: 4, fontWeight: 600 }}>
                  €127.5K/yr
                </div>
              </div>
            )}

            {/* Allianz card - appears in won */}
            {colIdx === 2 && moveProgress >= 0.5 && (
              <div
                style={{
                  padding: '12px 14px',
                  background: `linear-gradient(135deg, ${THEME.green}12, ${THEME.green}06)`,
                  border: `1px solid ${THEME.green}30`,
                  borderRadius: 12,
                  marginBottom: 8,
                  opacity: interpolate(moveProgress, [0.5, 0.8], [0, 1], { extrapolateRight: 'clamp' }),
                  transform: `scale(${interpolate(moveProgress, [0.5, 1], [0.8, 1], { extrapolateRight: 'clamp' })})`,
                  boxShadow: `0 0 ${20 * (1 - Math.min(1, (frame - moveFrame - 20) / 30))}px ${THEME.green}30`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textPrimary, fontFamily: FONT }}>
                  Allianz
                </div>
                <div style={{ fontSize: 11, color: THEME.textMuted, fontFamily: FONT, marginTop: 2 }}>
                  Devang Patel · VP Product
                </div>
                <div style={{ fontSize: 11, color: THEME.green, fontFamily: FONT, marginTop: 4, fontWeight: 700 }}>
                  €127.5K/yr · WON
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* KPI cards update */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 24,
        }}
      >
        <KPICard label="Active Leads" value="7" color={THEME.accent} delay={kpiUpdateFrame} width={180} />
        <KPICard
          label="Won"
          value="1"
          color={THEME.green}
          delay={kpiUpdateFrame + 20}
          width={180}
          highlight
          highlightFrame={kpiUpdateFrame + 35}
          newValue="2"
        />
        <KPICard
          label="Pipeline"
          value="€48K"
          color={THEME.blue}
          delay={kpiUpdateFrame + 40}
          width={180}
          highlight
          highlightFrame={kpiUpdateFrame + 55}
          newValue="€175K"
        />
      </div>

      {/* Activity toast */}
      {frame >= confettiFrame + 15 && (
        <div
          style={{
            position: 'absolute',
            bottom: 260,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            background: `${THEME.green}15`,
            border: `1px solid ${THEME.green}30`,
            borderRadius: 14,
            opacity: interpolate(frame - confettiFrame - 15, [0, 18], [0, 1], { extrapolateRight: 'clamp' }),
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>🎉</span>
          <span style={{ fontSize: 14, color: THEME.green, fontFamily: FONT, fontWeight: 600 }}>
            Deal won — Allianz (€127.5K/yr)
          </span>
        </div>
      )}

      {/* Confetti */}
      {frame >= confettiFrame && <Particles startFrame={confettiFrame} count={50} centerX={960} centerY={300} />}
    </AbsoluteFill>
  );
};
