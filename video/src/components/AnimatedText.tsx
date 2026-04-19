import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { THEME, FONT } from '../theme';

/* Typewriter: reveals text word-by-word at ~5 words/sec (every 6 frames at 30fps) */
export const Typewriter: React.FC<{
  text: string;
  startFrame?: number;
  wordsPerSec?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame = 0,
  wordsPerSec = 5,
  fontSize = 16,
  color = THEME.textPrimary,
  fontWeight = 400,
  lineHeight = 1.6,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const framesPerWord = fps / wordsPerSec;
  const words = text.split(' ');
  const visibleWords = Math.min(words.length, Math.floor(elapsed / framesPerWord) + 1);

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: FONT,
        lineHeight,
        ...style,
      }}
    >
      {words.slice(0, visibleWords).join(' ')}
      {visibleWords < words.length && (
        <span
          style={{
            opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
            color: THEME.accent,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};

/* FadeIn text with optional slide */
export const FadeInText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  style?: React.CSSProperties;
  slideY?: number;
}> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = THEME.textPrimary,
  fontWeight = 700,
  style = {},
  slideY = 20,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const opacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(f, [0, 15], [slideY, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: FONT,
        opacity,
        transform: `translateY(${y}px)`,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
