import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'grid' },
  { label: 'Leadbook', icon: 'users' },
  { label: 'Pipeline', icon: 'kanban' },
  { label: 'Agent Brain', icon: 'brain' },
  { label: 'Settings', icon: 'gear' },
];

/* Simple shape-based icon stand-ins */
const NavIcon: React.FC<{ type: string; active: boolean }> = ({ type, active }) => {
  const c = active ? THEME.accent : THEME.textFaint;
  const s = 18;
  if (type === 'grid')
    return (
      <svg width={s} height={s} viewBox="0 0 18 18">
        <rect x={1} y={1} width={7} height={7} rx={2} fill={c} />
        <rect x={10} y={1} width={7} height={7} rx={2} fill={c} opacity={0.6} />
        <rect x={1} y={10} width={7} height={7} rx={2} fill={c} opacity={0.6} />
        <rect x={10} y={10} width={7} height={7} rx={2} fill={c} opacity={0.4} />
      </svg>
    );
  if (type === 'users')
    return (
      <svg width={s} height={s} viewBox="0 0 18 18">
        <circle cx={9} cy={6} r={3.5} fill={c} />
        <ellipse cx={9} cy={15} rx={6} ry={3.5} fill={c} opacity={0.6} />
      </svg>
    );
  if (type === 'kanban')
    return (
      <svg width={s} height={s} viewBox="0 0 18 18">
        <rect x={1} y={1} width={4} height={16} rx={1.5} fill={c} />
        <rect x={7} y={1} width={4} height={11} rx={1.5} fill={c} opacity={0.7} />
        <rect x={13} y={1} width={4} height={14} rx={1.5} fill={c} opacity={0.5} />
      </svg>
    );
  if (type === 'brain')
    return (
      <svg width={s} height={s} viewBox="0 0 18 18">
        <circle cx={9} cy={9} r={7} fill="none" stroke={c} strokeWidth={1.5} />
        <circle cx={9} cy={9} r={3} fill={c} opacity={0.5} />
        <line x1={9} y1={2} x2={9} y2={6} stroke={c} strokeWidth={1} />
        <line x1={9} y1={12} x2={9} y2={16} stroke={c} strokeWidth={1} />
        <line x1={2} y1={9} x2={6} y2={9} stroke={c} strokeWidth={1} />
        <line x1={12} y1={9} x2={16} y2={9} stroke={c} strokeWidth={1} />
      </svg>
    );
  // gear
  return (
    <svg width={s} height={s} viewBox="0 0 18 18">
      <circle cx={9} cy={9} r={3} fill="none" stroke={c} strokeWidth={1.5} />
      <circle cx={9} cy={9} r={7} fill="none" stroke={c} strokeWidth={1} strokeDasharray="3 3" />
    </svg>
  );
};

export const DashboardFrame: React.FC<{
  children: React.ReactNode;
  activeNav?: string;
  highlightNav?: string;
  showSidebar?: boolean;
  fadeIn?: boolean;
  delay?: number;
}> = ({
  children,
  activeNav = 'Dashboard',
  highlightNav,
  showSidebar = true,
  fadeIn = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const opacity = fadeIn ? interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' }) : 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${THEME.bgTop} 0%, ${THEME.bg} 100%)`,
        }}
      />

      {showSidebar && (
        /* Sidebar */
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 260,
            background: 'rgba(20, 20, 21, 0.95)',
            borderRight: `1px solid ${THEME.border}`,
            padding: '32px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              fontFamily: FONT,
              color: THEME.textPrimary,
              marginBottom: 40,
              paddingLeft: 12,
            }}
          >
            <span style={{ color: THEME.accent }}>Happier</span> Robot
          </div>

          {/* Nav */}
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === activeNav;
            const isHighlighted = item.label === highlightNav;
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: isActive
                    ? THEME.accentLight
                    : isHighlighted
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',
                  border: isHighlighted
                    ? `1px solid ${THEME.accent}40`
                    : '1px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <NavIcon type={item.icon} active={isActive || !!isHighlighted} />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? THEME.accent : THEME.textMuted,
                    fontFamily: FONT,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}

          {/* Bottom spacer */}
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: 11,
              color: THEME.textFaint,
              fontFamily: MONO,
              paddingLeft: 12,
            }}
          >
            v1.0 · TUM.AI Hackathon
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          left: showSidebar ? 260 : 0,
          top: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
