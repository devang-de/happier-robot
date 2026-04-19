import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';
import { GradientBackground } from '../components/GradientBackground';
import { SlackMessage } from '../components/SlackMessage';

export const HITLScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Status transition: open -> answered
  const answeredFrame = 200;
  const isAnswered = frame >= answeredFrame;
  const statusGlow = isAnswered
    ? interpolate(frame - answeredFrame, [0, 10, 25], [0, 0.5, 0.1], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.06} accentColor={THEME.purple} />

      <div style={{ padding: '40px 100px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <div
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 14, color: THEME.accent, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 8 }}>
            Slack Integration
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: THEME.textPrimary, fontFamily: FONT }}>
            Human-in-the-Loop Resolution
          </div>
        </div>

        {/* Slack mockup */}
        <div
          style={{
            flex: 1,
            background: '#1a1d21',
            borderRadius: 16,
            border: `1px solid rgba(255,255,255,0.06)`,
            overflow: 'hidden',
            opacity: interpolate(frame, [10, 28], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {/* Channel header */}
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16, color: THEME.textMuted }}>#</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: THEME.textPrimary, fontFamily: FONT }}>
              pricing-team
            </span>
          </div>

          {/* Messages */}
          <div style={{ padding: '16px 0' }}>
            <SlackMessage avatar="🤖" name="Happier Robot Bot" isBot startFrame={30}>
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8,
                  borderLeft: `3px solid ${THEME.accent}`,
                  marginTop: 4,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: THEME.accent, marginBottom: 8 }}>
                  HITL Query — Allianz (Devang Patel, VP Product)
                </div>
                <div style={{ fontSize: 13, color: THEME.textSecondary, marginBottom: 6 }}>
                  <strong style={{ color: THEME.textPrimary }}>Question:</strong> Can we offer more than 10% for a 3-year enterprise deal worth ~€150K annually?
                </div>
                <div style={{ fontSize: 13, color: THEME.textSecondary }}>
                  <strong style={{ color: THEME.textPrimary }}>Context:</strong> Competitor (Bland AI) quoted 25% less.
                </div>
                <div style={{ fontSize: 11, color: THEME.textFaint, marginTop: 8, fontStyle: 'italic' }}>
                  Reply in thread to answer ↓
                </div>
              </div>
            </SlackMessage>

            <SlackMessage avatar="👩" name="Julia (Head of Pricing)" startFrame={100}>
              <div>
                We can go up to <strong style={{ color: THEME.green }}>15%</strong> for 3-year prepaid. Include dedicated CSM and priority SLA. Total package value <strong style={{ color: THEME.green }}>€127.5K/yr</strong>.
              </div>
            </SlackMessage>

            <SlackMessage avatar="🤖" name="Happier Robot Bot" isBot startFrame={160}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: THEME.green, fontSize: 16 }}>&#10003;</span>
                <span>Answer recorded. Will deliver to Allianz in next outreach.</span>
              </div>
            </SlackMessage>
          </div>
        </div>

        {/* Status update */}
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            opacity: interpolate(frame, [answeredFrame, answeredFrame + 20], [0, 1], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              background: `${THEME.green}10`,
              border: `1px solid ${THEME.green}30`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: statusGlow > 0 ? `0 0 20px ${THEME.green}${Math.round(statusGlow * 255).toString(16).padStart(2, '0')}` : 'none',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: THEME.green }} />
            <span style={{ fontSize: 13, color: THEME.green, fontFamily: MONO, fontWeight: 600 }}>
              HITL: open → answered
            </span>
          </div>

          <div
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              background: `${THEME.accent}10`,
              border: `1px solid ${THEME.accent}30`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 13, color: THEME.accent, fontFamily: MONO }}>
              next_action: email · next_action_at: now
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
