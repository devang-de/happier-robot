import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../../src/theme';

const STEPS = [
  { label: 'Inbound Call', emoji: '\u{1F4DE}', color: THEME.green },
  { label: 'Lookup + Recall', emoji: '\u{1F50D}', color: THEME.blue },
  { label: 'Qualify & Negotiate', emoji: '\u{1F91D}', color: THEME.accent },
  { label: 'Extract + Store', emoji: '\u{1F4BE}', color: THEME.purple },
  { label: 'Escalate to Slack', emoji: '\u{1F6A8}', color: THEME.yellow },
  { label: 'Human Answers', emoji: '\u{1F9D1}\u200D\u{1F4BC}', color: THEME.textSecondary },
  { label: 'Deliver to Lead', emoji: '\u{1F4E4}', color: THEME.blue },
  { label: 'Brain Learns', emoji: '\u{1F9E0}', color: THEME.accent },
];

const GUARDRAILS = [
  { label: '\u226410% discount', color: THEME.green, icon: '\u2713' },
  { label: '>25% block', color: THEME.red, icon: '\u2717' },
];

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // Horizontal pipeline layout - 2 rows of 4
  const cols = 4;
  const cardW = 340;
  const cardH = 130;
  const gapX = 45;
  const gapY = 180;
  const gridW = cols * cardW + (cols - 1) * gapX;
  const startX = (1920 - gridW) / 2;
  const startY = 220;

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
          opacity: 0.1,
          top: '5%',
          left: '25%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(107,179,255,0.1) 0%, transparent 70%)`,
          opacity: 0.08,
          bottom: '5%',
          right: '10%',
        }}
      />

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: 35,
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
        Pipeline Overview
      </div>

      <div
        style={{
          position: 'absolute',
          top: 60,
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
        How It <span style={{ color: THEME.accent }}>Works</span>
      </div>

      {/* Flow steps */}
      {STEPS.map((step, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const actualCol = row === 1 ? (cols - 1 - col) : col;
        const x = startX + actualCol * (cardW + gapX);
        const y = startY + row * (cardH + gapY);

        const delay = 25 + i * 28;
        const stepScale = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: SPRING_CONFIG,
        });
        const stepOpacity = interpolate(
          frame,
          [delay, delay + 20],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        return (
          <React.Fragment key={i}>
            {/* Step card */}
            <div
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: cardW,
                height: cardH,
                opacity: stepOpacity,
                transform: `scale(${interpolate(stepScale, [0, 1], [0.85, 1])})`,
                background: THEME.surface,
                borderRadius: 20,
                border: `1px solid ${step.color}25`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '0 24px',
                boxShadow: `0 4px 30px ${step.color}10, ${THEME.cardInnerHighlight}`,
              }}
            >
              {/* Numbered circle */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `${step.color}12`,
                  border: `2px solid ${step.color}35`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: 24 }}>{step.emoji}</div>
                {/* Step number badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: step.color,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#000',
                    fontFamily: MONO,
                  }}
                >
                  {i + 1}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: THEME.textPrimary,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: THEME.textMuted,
                    fontFamily: MONO,
                    marginTop: 4,
                    letterSpacing: '0.05em',
                  }}
                >
                  Step {i + 1} of 8
                </div>
              </div>

              {/* Guardrail badges for step 3 */}
              {i === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginLeft: 'auto' }}>
                  {GUARDRAILS.map((g, gi) => {
                    const gDelay = delay + 15 + gi * 8;
                    const gOpacity = interpolate(
                      frame,
                      [gDelay, gDelay + 12],
                      [0, 1],
                      { extrapolateRight: 'clamp' }
                    );
                    return (
                      <div
                        key={gi}
                        style={{
                          opacity: gOpacity,
                          padding: '3px 8px',
                          borderRadius: 8,
                          background: `${g.color}12`,
                          border: `1px solid ${g.color}30`,
                          fontSize: 10,
                          fontFamily: MONO,
                          fontWeight: 600,
                          color: g.color,
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {g.icon} {g.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Gradient arrows between steps */}
            {i < STEPS.length - 1 && (() => {
              const arrowDelay = delay + 18;
              const arrowOpacity = interpolate(
                frame,
                [arrowDelay, arrowDelay + 12],
                [0, 0.7],
                { extrapolateRight: 'clamp' }
              );

              const nextI = i + 1;
              const nextRow = Math.floor(nextI / cols);
              const nextCol = nextI % cols;
              const nextActualCol = nextRow === 1 ? (cols - 1 - nextCol) : nextCol;
              const nextX = startX + nextActualCol * (cardW + gapX);
              const nextY = startY + nextRow * (cardH + gapY);

              if (row === nextRow) {
                const fromX = row === 0 ? x + cardW : x;
                const toX = row === 0 ? nextX : nextX + cardW;
                const midY = y + cardH / 2;
                const arrowLen = Math.abs(toX - fromX);
                const dir = toX > fromX ? 1 : -1;

                return (
                  <svg
                    style={{
                      position: 'absolute',
                      left: dir > 0 ? fromX : toX,
                      top: midY - 10,
                      width: arrowLen,
                      height: 20,
                      pointerEvents: 'none',
                    }}
                  >
                    <defs>
                      <linearGradient id={`arrowGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.6} />
                        <stop offset="100%" stopColor={THEME.accent} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <line
                      x1={4}
                      y1={10}
                      x2={arrowLen - 8}
                      y2={10}
                      stroke={`url(#arrowGrad-${i})`}
                      strokeWidth={2}
                      opacity={arrowOpacity}
                    />
                    <polygon
                      points={
                        dir > 0
                          ? `${arrowLen - 8},6 ${arrowLen - 8},14 ${arrowLen},10`
                          : `8,6 8,14 0,10`
                      }
                      fill={THEME.accent}
                      opacity={arrowOpacity * 0.6}
                    />
                  </svg>
                );
              }

              // Vertical transition
              const fromMidX = x + cardW / 2;
              const toMidX = nextX + cardW / 2;
              const fromY2 = y + cardH;

              return (
                <svg
                  style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                  width={1920}
                  height={1080}
                >
                  <defs>
                    <linearGradient id={`arrowGradV-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={THEME.accent} stopOpacity={0.15} />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${fromMidX} ${fromY2} Q ${fromMidX} ${fromY2 + 60} ${(fromMidX + toMidX) / 2} ${fromY2 + 60} Q ${toMidX} ${fromY2 + 60} ${toMidX} ${nextY}`}
                    fill="none"
                    stroke={`url(#arrowGradV-${i})`}
                    strokeWidth={2}
                    opacity={arrowOpacity}
                  />
                  <polygon
                    points={`${toMidX - 5},${nextY - 4} ${toMidX + 5},${nextY - 4} ${toMidX},${nextY + 3}`}
                    fill={THEME.accent}
                    opacity={arrowOpacity * 0.6}
                  />
                </svg>
              );
            })()}
          </React.Fragment>
        );
      })}

      {/* Loop-back arrow from Brain Learns back to start */}
      {(() => {
        const loopDelay = 25 + 8 * 28 + 10;
        const loopOpacity = interpolate(
          frame,
          [loopDelay, loopDelay + 20],
          [0, 0.5],
          { extrapolateRight: 'clamp' }
        );

        const lastRow = 1;
        const lastCol = STEPS.length - 1 - 4;
        const lastActualCol = cols - 1 - lastCol;
        const lastX = startX + lastActualCol * (cardW + gapX);
        const lastY = startY + lastRow * (cardH + gapY);
        const firstX = startX;
        const firstY = startY;

        return (
          <svg
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            width={1920}
            height={1080}
          >
            <defs>
              <linearGradient id="loopGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.5} />
                <stop offset="100%" stopColor={THEME.accent} stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <path
              d={`M ${lastX} ${lastY + cardH / 2}
                  Q ${lastX - 80} ${lastY + cardH / 2} ${lastX - 80} ${(lastY + firstY + cardH) / 2}
                  Q ${lastX - 80} ${firstY + cardH / 2} ${firstX} ${firstY + cardH / 2}`}
              fill="none"
              stroke="url(#loopGrad)"
              strokeWidth={2}
              strokeDasharray="8,5"
              opacity={loopOpacity}
            />
            <polygon
              points={`${firstX + 2},${firstY + cardH / 2 - 5} ${firstX + 2},${firstY + cardH / 2 + 5} ${firstX - 6},${firstY + cardH / 2}`}
              fill={THEME.accent}
              opacity={loopOpacity}
            />
            {/* Loop label */}
            <text
              x={lastX - 90}
              y={(lastY + cardH / 2 + firstY + cardH / 2) / 2}
              fill={THEME.accent}
              fontSize={11}
              fontFamily="IBM Plex Mono, monospace"
              fontWeight={500}
              opacity={loopOpacity}
              textAnchor="middle"
              transform={`rotate(-90, ${lastX - 90}, ${(lastY + cardH / 2 + firstY + cardH / 2) / 2})`}
            >
              CONTINUOUS LOOP
            </text>
          </svg>
        );
      })()}
    </AbsoluteFill>
  );
};
