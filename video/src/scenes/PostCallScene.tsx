import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME, FONT, MONO, SPRING_CONFIG } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

interface FlowStep {
  icon: string;
  title: string;
  description: string;
  details: string[];
  color: string;
  startFrame: number;
}

const STEPS: FlowStep[] = [
  {
    icon: '📋',
    title: 'Post-Call Extract',
    description: 'Extracted data from conversation',
    details: ['Company: Allianz', 'Contact: Devang Patel, VP Product', 'Need: Claims automation (50K calls/mo)', 'Timeline: Next Tuesday'],
    color: THEME.accent,
    startFrame: 5,
  },
  {
    icon: '💾',
    title: 'Write to Twin DB',
    description: 'Lead record created',
    details: ['lead_id: lead-allianz-001', 'stage: qualified', 'confidence: 0.65'],
    color: THEME.blue,
    startFrame: 50,
  },
  {
    icon: '🧠',
    title: 'Cognee Learn',
    description: 'Context stored in knowledge graph',
    details: ['Allianz context', '50K monthly calls', 'Claims use case'],
    color: THEME.purple,
    startFrame: 95,
  },
  {
    icon: '📅',
    title: 'Schedule Follow-up',
    description: 'Next action scheduled',
    details: ['Send demo confirmation', 'Tuesday 10 AM CET', 'Channel: email'],
    color: THEME.green,
    startFrame: 135,
  },
];

export const PostCallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.08} accentColor={THEME.blue} />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontSize: 14, color: THEME.accent, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 8 }}>
          Automated Processing
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: THEME.textPrimary, fontFamily: FONT }}>
          Post-Call Pipeline
        </div>
      </div>

      {/* Flow steps */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 24,
        }}
      >
        {STEPS.map((step, i) => {
          const f = Math.max(0, frame - step.startFrame);
          const stepScale = spring({ frame: f, fps, config: SPRING_CONFIG });
          const stepOpacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

          // Checkmark appears after details
          const checkFrame = step.startFrame + 40;
          const checkOpacity = interpolate(frame, [checkFrame, checkFrame + 15], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          // Arrow to next step
          const arrowOpacity = i < STEPS.length - 1
            ? interpolate(frame, [step.startFrame + 25, step.startFrame + 35], [0, 0.5], {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              })
            : 0;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  flex: 1,
                  opacity: stepOpacity,
                  transform: `scale(${interpolate(stepScale, [0, 1], [0.9, 1])})`,
                }}
              >
                {/* Step card */}
                <div
                  style={{
                    background: THEME.cardBg,
                    borderRadius: 20,
                    border: `1px solid ${step.color}25`,
                    padding: '20px 18px',
                    position: 'relative',
                  }}
                >
                  {/* Icon */}
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>

                  {/* Title */}
                  <div style={{ fontSize: 16, fontWeight: 700, color: step.color, fontFamily: FONT, marginBottom: 4 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 11, color: THEME.textMuted, fontFamily: FONT, marginBottom: 14 }}>
                    {step.description}
                  </div>

                  {/* Details */}
                  {step.details.map((detail, j) => {
                    const detailOpacity = interpolate(
                      frame,
                      [step.startFrame + 15 + j * 5, step.startFrame + 25 + j * 5],
                      [0, 1],
                      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                    );
                    return (
                      <div
                        key={j}
                        style={{
                          fontSize: 11,
                          color: THEME.textSecondary,
                          fontFamily: MONO,
                          padding: '3px 0',
                          opacity: detailOpacity,
                          borderLeft: `2px solid ${step.color}30`,
                          paddingLeft: 10,
                          marginBottom: 2,
                        }}
                      >
                        {detail}
                      </div>
                    );
                  })}

                  {/* Checkmark */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: `${THEME.green}20`,
                      border: `2px solid ${THEME.green}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: checkOpacity,
                      transform: `scale(${interpolate(checkOpacity, [0, 1], [0.5, 1])})`,
                    }}
                  >
                    <span style={{ color: THEME.green, fontSize: 14, fontWeight: 800 }}>&#10003;</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    opacity: arrowOpacity,
                    alignSelf: 'center',
                  }}
                >
                  <svg width={24} height={24} viewBox="0 0 24 24">
                    <path d="M5 12h14M14 7l5 5-5 5" stroke={THEME.textFaint} strokeWidth={2} fill="none" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
