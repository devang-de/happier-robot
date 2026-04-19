import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

const OUTBOUND_BODY = `Hi Devang,

Great speaking with you today. I've scheduled a demo on claims automation for Tuesday at 10 AM CET.

We'll cover:
  - Voice agent handling inbound claims calls
  - Smart routing for complex cases
  - Integration with your telephony

Looking forward to it.

Best,
Sarah`;

const REPLY_BODY = `Hi Sarah,

Thanks for setting this up. Can you also show us your API for CRM integration?

What discount can you offer for a 3-year enterprise deal?

Best,
Devang`;

export const EmailFollowUpScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Outbound email (0-120)
  // Phase 2: Sent animation (120-140)
  // Phase 3: Reply appears (145-240)

  const outWords = OUTBOUND_BODY.split(' ');
  const outVisible = Math.min(outWords.length, Math.floor(Math.max(0, frame - 10) / 3) + 1);

  const sentFrame = 120;
  const isSent = frame >= sentFrame;
  const sentProgress = isSent ? interpolate(frame - sentFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }) : 0;

  const replyFrame = 145;
  const replyWords = REPLY_BODY.split(' ');
  const replyVisible = frame >= replyFrame
    ? Math.min(replyWords.length, Math.floor((frame - replyFrame - 15) / 4) + 1)
    : 0;

  const replyOpacity = frame >= replyFrame
    ? interpolate(frame - replyFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.06} />

      <div style={{ padding: '40px 120px', display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
        {/* Title */}
        <div
          style={{
            fontSize: 14,
            color: THEME.accent,
            fontFamily: MONO,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Follow-Up Email
        </div>

        {/* Outbound email */}
        <div
          style={{
            background: THEME.cardBg,
            borderRadius: THEME.cardRadius,
            border: `1px solid ${THEME.border}`,
            overflow: 'hidden',
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
            position: 'relative',
            flex: isSent && frame >= replyFrame ? undefined : 1,
          }}
        >
          {/* Header */}
          <div style={{ padding: '14px 24px', borderBottom: `1px solid ${THEME.border}` }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 55 }}>From</span>
              <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT }}>sarah@happyrobot.ai</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 55 }}>To</span>
              <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT }}>devang.patel@allianz.de</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 55 }}>Subject</span>
              <span style={{ fontSize: 14, color: THEME.textPrimary, fontFamily: FONT, fontWeight: 600 }}>
                Demo Confirmation — HappyRobot x Allianz
              </span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 24px', fontSize: 14, color: THEME.textSecondary, fontFamily: FONT, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {outWords.slice(0, outVisible).join(' ')}
          </div>

          {/* Sent overlay */}
          {isSent && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `rgba(0,0,0,${sentProgress * 0.5})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: THEME.cardRadius,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: THEME.green,
                  fontFamily: FONT,
                  opacity: sentProgress,
                  transform: `scale(${interpolate(sentProgress, [0, 1], [0.5, 1])})`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 28 }}>&#10003;</span> Sent
              </div>
            </div>
          )}
        </div>

        {/* Reply email */}
        {frame >= replyFrame && (
          <div
            style={{
              background: THEME.cardBg,
              borderRadius: THEME.cardRadius,
              border: `1px solid ${THEME.border}`,
              overflow: 'hidden',
              opacity: replyOpacity,
              transform: `translateY(${interpolate(replyOpacity, [0, 1], [15, 0])}px)`,
              flex: 1,
            }}
          >
            <div style={{ padding: '14px 24px', borderBottom: `1px solid ${THEME.border}` }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 55 }}>From</span>
                <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT }}>devang.patel@allianz.de</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 55 }}>Subject</span>
                <span style={{ fontSize: 14, color: THEME.textPrimary, fontFamily: FONT, fontWeight: 600 }}>
                  Re: Demo Confirmation
                </span>
              </div>
            </div>
            <div style={{ padding: '20px 24px', fontSize: 14, color: THEME.textSecondary, fontFamily: FONT, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {replyVisible > 0 ? replyWords.slice(0, replyVisible).join(' ') : ''}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
