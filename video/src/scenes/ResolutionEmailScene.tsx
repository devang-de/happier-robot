import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

const EMAIL_BODY = `Hi Devang,

Great news on both fronts:

Pricing: We can offer 15% off with a 3-year prepaid commitment, plus dedicated CSM and priority SLA — €127,500 per year.

DPA: Our legal team has prepared a BaFin-compliant Data Processing Agreement (attached).

Shall we schedule a call to finalize?

Best,
Sarah`;

export const ResolutionEmailScene: React.FC = () => {
  const frame = useCurrentFrame();

  const words = EMAIL_BODY.split(' ');
  const visible = Math.min(words.length, Math.floor(Math.max(0, frame - 20) / 3) + 1);

  const sentFrame = 170;
  const isSent = frame >= sentFrame;
  const sentProgress = isSent ? interpolate(frame - sentFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) : 0;

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.06} accentColor={THEME.green} />

      <div style={{ padding: '40px 160px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 14,
            color: THEME.accent,
            fontFamily: MONO,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: 20,
            opacity: interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Resolution Email
        </div>

        <div
          style={{
            flex: 1,
            background: THEME.cardBg,
            borderRadius: THEME.cardRadius,
            border: `1px solid ${THEME.border}`,
            overflow: 'hidden',
            opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' }),
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px 28px', borderBottom: `1px solid ${THEME.border}` }}>
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
                Re: Pricing & DPA — Great news
              </span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px', fontSize: 15, color: THEME.textSecondary, fontFamily: FONT, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {words.slice(0, visible).join(' ')}
          </div>

          {/* Attachment indicator */}
          {frame >= 110 && (
            <div
              style={{
                padding: '8px 28px 20px',
                opacity: interpolate(frame - 110, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${THEME.border}`,
                }}
              >
                <span style={{ fontSize: 14 }}>📎</span>
                <span style={{ fontSize: 12, color: THEME.textMuted, fontFamily: FONT }}>
                  Allianz_DPA_BaFin_Compliant.pdf
                </span>
              </div>
            </div>
          )}

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
                  fontSize: 24,
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
                <span style={{ fontSize: 30 }}>&#10003;</span> Sent
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
