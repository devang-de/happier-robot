import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME, FONT } from '../theme';

export interface BubbleMessage {
  speaker: 'agent' | 'customer';
  name: string;
  text: string;
}

export const CallBubble: React.FC<{
  message: BubbleMessage;
  startFrame: number;
  wordsPerSec?: number;
}> = ({ message, startFrame, wordsPerSec = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const framesPerWord = fps / wordsPerSec;
  const words = message.text.split(' ');
  const visibleWords = Math.min(words.length, Math.floor(elapsed / framesPerWord) + 1);

  if (frame < startFrame) return null;

  const isAgent = message.speaker === 'agent';
  const bubbleOpacity = Math.min(1, elapsed / 8);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isAgent ? 'flex-start' : 'flex-end',
        marginBottom: 12,
        opacity: bubbleOpacity,
      }}
    >
      <div
        style={{
          maxWidth: '85%',
          padding: '12px 16px',
          borderRadius: 16,
          borderTopLeftRadius: isAgent ? 4 : 16,
          borderTopRightRadius: isAgent ? 16 : 4,
          background: isAgent
            ? 'linear-gradient(135deg, rgba(255,152,47,0.15), rgba(255,152,47,0.08))'
            : 'rgba(255,255,255,0.06)',
          border: `1px solid ${isAgent ? 'rgba(255,152,47,0.2)' : THEME.border}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isAgent ? THEME.accent : THEME.textMuted,
            fontFamily: FONT,
            marginBottom: 4,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {message.name}
        </div>
        <div
          style={{
            fontSize: 14,
            color: THEME.textPrimary,
            fontFamily: FONT,
            lineHeight: 1.5,
          }}
        >
          {words.slice(0, visibleWords).join(' ')}
          {visibleWords < words.length && (
            <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0, color: THEME.accent }}>
              |
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
