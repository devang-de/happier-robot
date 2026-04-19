import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';

export const EmailCard: React.FC<{
  from: string;
  to: string;
  subject: string;
  body: string;
  startFrame: number;
  wordsPerSec?: number;
  sent?: boolean;
  sentFrame?: number;
}> = ({ from, to, subject, body, startFrame, wordsPerSec = 8, sent = false, sentFrame = 9999 }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const f = frame - startFrame;
  const cardOpacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const cardY = interpolate(f, [0, 15], [20, 0], { extrapolateRight: 'clamp' });

  const elapsed = Math.max(0, f - 15);
  const framesPerWord = 30 / wordsPerSec;
  const words = body.split(' ');
  const visibleWords = Math.min(words.length, Math.floor(elapsed / framesPerWord) + 1);

  const isSent = sent && frame >= sentFrame;
  const sentAnim = isSent ? interpolate(frame - sentFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) : 0;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        background: THEME.cardBg,
        borderRadius: THEME.cardRadius,
        border: `1px solid ${THEME.border}`,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${THEME.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 50 }}>From</span>
          <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT }}>{from}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 50 }}>To</span>
          <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: FONT }}>{to}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <span style={{ fontSize: 11, color: THEME.textFaint, fontFamily: MONO, width: 50 }}>Subject</span>
          <span style={{ fontSize: 14, color: THEME.textPrimary, fontFamily: FONT, fontWeight: 600 }}>
            {subject}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '20px 24px',
          fontSize: 14,
          color: THEME.textSecondary,
          fontFamily: FONT,
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          minHeight: 100,
        }}
      >
        {words.slice(0, visibleWords).join(' ')}
      </div>

      {/* Sent overlay */}
      {isSent && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `rgba(0,0,0,${sentAnim * 0.6})`,
            borderRadius: THEME.cardRadius,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: THEME.green,
              fontFamily: FONT,
              opacity: sentAnim,
              transform: `scale(${interpolate(sentAnim, [0, 1], [0.5, 1])})`,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 32 }}>&#10003;</span> Sent
          </div>
        </div>
      )}
    </div>
  );
};
