import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT } from '../theme';

export const SlackMessage: React.FC<{
  avatar: string;
  name: string;
  isBot?: boolean;
  children: React.ReactNode;
  startFrame: number;
}> = ({ avatar, name, isBot = false, children, startFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const f = frame - startFrame;
  const opacity = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(f, [0, 18], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '8px 20px',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: isBot
            ? `linear-gradient(135deg, ${THEME.accent}, ${THEME.yellow})`
            : THEME.surfaceSolid,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: THEME.textPrimary,
              fontFamily: FONT,
            }}
          >
            {name}
          </span>
          {isBot && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: THEME.accent,
                background: THEME.accentLight,
                padding: '1px 6px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}
            >
              APP
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 13,
            color: THEME.textSecondary,
            fontFamily: FONT,
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
