import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

/*
  NEW APPROACH: "Document scroll" style.

  The entire conversation is rendered as a tall document.
  The camera slowly pans DOWN over it, revealing each message naturally.
  Nothing disappears. Everything stays. The viewer reads as it scrolls by.

  Scene duration: 510 frames (17s at 30fps)
  Total content height: ~1800px
  Viewport: ~900px visible
  Scroll: ~900px over 510 frames = ~1.76px per frame
*/

const CONVERSATION = [
  { speaker: 'agent', name: 'SARAH', text: 'Hi, Sarah from HappyRobot — who am I speaking with?' },
  { speaker: 'customer', name: 'DEVANG', text: "Hi Sarah, I'm Devang Patel, VP of Product at Allianz. We're looking at AI phone agents for our customer service." },
  { type: 'system', text: '🔍 lookup_lead → New lead detected', color: THEME.blue },
  { type: 'system', text: '🧠 recall_cognee → No prior context', color: THEME.purple },
  { speaker: 'agent', name: 'SARAH', text: 'Welcome, Devang. We help teams like yours automate customer communications with voice AI. What specific workflow are you trying to improve?' },
  { speaker: 'customer', name: 'DEVANG', text: 'We handle about fifty thousand inbound calls per month for claims processing. Our wait times are brutal.' },
  { speaker: 'agent', name: 'SARAH', text: 'Fifty thousand monthly calls is significant. Our voice agents handle inbound calls with natural conversation, route complex cases to humans, and reduce average handle time by about sixty percent. Would it help to see a focused demo?' },
  { speaker: 'customer', name: 'DEVANG', text: 'Yes, that sounds great. Can we do next Tuesday?' },
  { speaker: 'agent', name: 'SARAH', text: "Perfect. I'll send a calendar invite for next Tuesday at ten AM. Looking forward to showing you what we can do for Allianz." },
  { type: 'stage', text: 'Stage: new → qualified ✓', color: THEME.green },
] as const;

export const InboundCallScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in the whole scene
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Slow scroll: start at y=0, end at y=-950px over the full duration
  const scrollY = interpolate(frame, [30, 490], [0, -950], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.05} />

      <div style={{ height: '100%', display: 'flex', opacity }}>

        {/* LEFT SIDEBAR - 22% */}
        <div style={{
          width: '22%', borderRight: `1px solid ${THEME.border}`,
          padding: '28px 20px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: THEME.textPrimary, fontFamily: FONT, marginBottom: 20 }}>
            <span style={{ color: THEME.accent }}>Happier</span> Robot
          </div>

          {/* Incoming call */}
          <div style={{
            padding: '10px 12px', borderRadius: 12, marginBottom: 14,
            background: `linear-gradient(135deg, ${THEME.accent}14, ${THEME.accent}08)`,
            border: `1px solid ${THEME.accent}25`,
            boxShadow: `0 0 ${14 + Math.sin(frame * 0.12) * 6}px ${THEME.accent}12`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: THEME.accent, boxShadow: `0 0 5px ${THEME.accent}` }} />
              <span style={{ fontSize: 10, color: THEME.accent, fontFamily: MONO, fontWeight: 600 }}>LIVE · INBOUND</span>
            </div>
            <div style={{ fontSize: 11, color: THEME.textSecondary, fontFamily: FONT, marginTop: 4 }}>+49 89 555 1234</div>
          </div>

          <div style={{ fontSize: 10, color: THEME.textFaint, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>Pipeline</div>
          {[
            { name: 'BMW', stage: 'negotiation', color: THEME.yellow },
            { name: 'Siemens', stage: 'qualified', color: THEME.green },
            { name: 'SAP', stage: 'new', color: THEME.textMuted },
          ].map((l, i) => (
            <div key={i} style={{
              padding: '7px 10px', marginBottom: 5, borderRadius: 8,
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${THEME.border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: THEME.textSecondary, fontFamily: FONT }}>{l.name}</span>
                <span style={{ fontSize: 8, color: l.color, fontFamily: MONO, background: `${l.color}15`, padding: '1px 5px', borderRadius: 4 }}>{l.stage}</span>
              </div>
            </div>
          ))}

          {/* Allianz appears after scroll progresses */}
          {frame > 350 && (
            <div style={{
              padding: '7px 10px', marginTop: 4, borderRadius: 8,
              background: `${THEME.green}08`, border: `1px solid ${THEME.green}20`,
              opacity: interpolate(frame, [350, 370], [0, 1], { extrapolateRight: 'clamp' }),
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: THEME.textPrimary, fontFamily: FONT }}>Allianz</span>
                <span style={{ fontSize: 8, color: THEME.green, fontFamily: MONO, fontWeight: 700, background: `${THEME.green}15`, padding: '1px 5px', borderRadius: 4 }}>QUALIFIED</span>
              </div>
            </div>
          )}

          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 9, color: THEME.textFaint, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Guardrails</div>
          {[
            { r: '≤10%', s: '✓', c: THEME.green },
            { r: '10-25%', s: '⚠', c: THEME.yellow },
            { r: '>25%', s: '✗', c: THEME.red },
          ].map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: g.c, fontFamily: MONO }}>{g.s}</span>
              <span style={{ fontSize: 9, color: THEME.textMuted, fontFamily: MONO }}>{g.r}</span>
            </div>
          ))}
        </div>

        {/* RIGHT: SCROLLING TRANSCRIPT - 78% */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Fixed header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 24px', borderBottom: `1px solid ${THEME.border}`,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <span style={{ fontSize: 16 }}>📞</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: THEME.textPrimary, fontFamily: FONT }}>Inbound Call — Allianz</span>
            <span style={{ fontSize: 11, color: THEME.textMuted, fontFamily: MONO, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>
              INBOUND CALL WORKFLOW
            </span>
            <div style={{ flex: 1 }} />
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: THEME.red, opacity: Math.sin(frame * 0.1) > 0 ? 1 : 0.3 }} />
            <span style={{ fontSize: 10, color: THEME.red, fontFamily: MONO, fontWeight: 600 }}>REC</span>
          </div>

          {/* Scrolling content area */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              transform: `translateY(${scrollY}px)`,
              padding: '30px 40px 200px 40px',
            }}>
              {CONVERSATION.map((item, i) => {
                // "type" items are system labels or stage changes
                if ('type' in item) {
                  return (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'center', margin: '16px 0',
                    }}>
                      <div style={{
                        padding: '6px 18px', borderRadius: 20,
                        background: `${item.color}12`, border: `1px solid ${item.color}22`,
                        fontSize: 13, fontFamily: MONO, color: item.color,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        {item.text}
                      </div>
                    </div>
                  );
                }

                // Chat messages
                const isAgent = item.speaker === 'agent';
                return (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: isAgent ? 'flex-start' : 'flex-end',
                    marginBottom: 20,
                  }}>
                    {/* Name + avatar */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                      flexDirection: isAgent ? 'row' : 'row-reverse',
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: isAgent
                          ? `linear-gradient(135deg, ${THEME.accent}, ${THEME.yellow})`
                          : `linear-gradient(135deg, ${THEME.blue}, ${THEME.purple})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: FONT,
                      }}>
                        {item.name[0]}
                      </div>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        color: isAgent ? THEME.accent : THEME.textMuted,
                        fontFamily: MONO, letterSpacing: '0.5px',
                      }}>
                        {item.name}
                      </span>
                    </div>

                    {/* Bubble */}
                    <div style={{
                      maxWidth: '75%',
                      padding: '14px 20px',
                      borderRadius: 20,
                      borderTopLeftRadius: isAgent ? 4 : 20,
                      borderTopRightRadius: isAgent ? 20 : 4,
                      background: isAgent
                        ? `linear-gradient(135deg, rgba(255,152,47,0.15), rgba(255,152,47,0.07))`
                        : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${isAgent ? 'rgba(255,152,47,0.2)' : THEME.border}`,
                      fontSize: 16, lineHeight: 1.65, color: THEME.textPrimary, fontFamily: FONT,
                    }}>
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top/bottom fade overlays for smooth scroll */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 60,
              background: 'linear-gradient(180deg, rgba(17,17,24,0.95) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
              background: 'linear-gradient(0deg, rgba(17,17,24,0.95) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
