import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT, MONO } from '../theme';
import { GradientBackground } from '../components/GradientBackground';

/*
  "Document scroll" approach for negotiation call.
  The entire conversation is pre-rendered. Camera pans down slowly.
  Nothing disappears. Everything stays on screen.

  Scene duration: 450 frames (15s at 30fps)
  Scroll: ~1100px over 450 frames
*/

const CONVERSATION = [
  { speaker: 'agent', name: 'SARAH', text: 'Hi Devang, Sarah from HappyRobot. How did the demo go from your side?' },
  { speaker: 'customer', name: 'DEVANG', text: "The demo was impressive. My team is on board. But we need to talk pricing. We're looking at a three-year deal — can you do thirty percent off?" },
  { type: 'system', text: '🛡 >25% — REFUSE & PIVOT', color: THEME.red },
  { speaker: 'agent', name: 'SARAH', text: "I appreciate you thinking long-term. A thirty percent discount isn't something I can offer. What I can do is ten percent if you commit to annual prepayment with a three-year term." },
  { type: 'system', text: '💡 Counter-offer: 10% + annual prepay', color: THEME.green },
  { speaker: 'customer', name: 'DEVANG', text: "Ten percent isn't enough. Bland AI quoted us twenty-five percent less." },
  { type: 'system', text: '🔍 raise_open_point → pricing team', color: THEME.yellow },
  { type: 'system', text: '📄 Ask for written competitor evidence', color: THEME.blue },
  { speaker: 'agent', name: 'SARAH', text: "Could you share that written quote so our pricing team can review? I can also explore a custom package with dedicated support." },
  { speaker: 'customer', name: 'DEVANG', text: "Sure. Also, we need BaFin-compliant DPA for German regulatory requirements." },
  { type: 'system', text: '🔍 raise_open_point → legal team', color: THEME.purple },
  { speaker: 'agent', name: 'SARAH', text: "Absolutely valid. Our legal team will prepare a BaFin-compliant DPA within forty-eight hours. Anything else blocking the deal?" },
] as const;

const HITL_ITEMS = [
  { team: 'PRICING', text: '30% discount for 3-year deal. Counter-offered 10%.', frame: 200, color: THEME.yellow },
  { team: 'LEGAL', text: 'BaFin-compliant DPA needed.', frame: 340, color: THEME.purple },
];

export const NegotiationScene: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Slow scroll down
  const scrollY = interpolate(frame, [20, 430], [0, -1100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <GradientBackground intensity={0.05} accentColor={THEME.yellow} />

      <div style={{ height: '100%', display: 'flex', opacity }}>

        {/* LEFT SIDEBAR - 25% */}
        <div style={{
          width: '25%', borderRight: `1px solid ${THEME.border}`,
          padding: '28px 20px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: THEME.textPrimary, fontFamily: FONT, marginBottom: 16 }}>
            <span style={{ color: THEME.accent }}>Happier</span> Robot
          </div>

          <div style={{ fontSize: 10, color: THEME.accent, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>
            HITL Escalations
          </div>

          {HITL_ITEMS.map((item, i) => {
            if (frame < item.frame) return null;
            const f = frame - item.frame;
            const op = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
            return (
              <div key={i} style={{
                padding: '10px 12px', marginBottom: 8, borderRadius: 12,
                background: `${item.color}08`, border: `1px solid ${item.color}18`,
                opacity: op,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, boxShadow: `0 0 4px ${item.color}` }} />
                  <span style={{ fontSize: 9, color: item.color, fontFamily: MONO, fontWeight: 600 }}>{item.team}</span>
                  <span style={{ fontSize: 8, color: THEME.textFaint, fontFamily: MONO, marginLeft: 'auto' }}>open</span>
                </div>
                <div style={{ fontSize: 10, color: THEME.textSecondary, fontFamily: FONT, lineHeight: 1.4 }}>{item.text}</div>
              </div>
            );
          })}

          <div style={{ flex: 1 }} />

          {/* Guardrails */}
          <div style={{
            padding: '10px 12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${THEME.border}`,
          }}>
            <div style={{ fontSize: 9, color: THEME.textFaint, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
              Discount Guardrails
            </div>
            {[
              { r: '≤10%', s: '✓ Safe', c: THEME.green },
              { r: '10-25%', s: '⚠ Escalate', c: THEME.yellow },
              { r: '>25%', s: '✗ Refuse', c: THEME.red },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
                <span style={{ fontSize: 10, color: THEME.textMuted, fontFamily: MONO }}>{g.r}</span>
                <span style={{ fontSize: 9, color: g.c, fontFamily: MONO, fontWeight: 600 }}>{g.s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: SCROLLING TRANSCRIPT - 75% */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Fixed header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 24px', borderBottom: `1px solid ${THEME.border}`,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <span style={{ fontSize: 16 }}>📞</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: THEME.textPrimary, fontFamily: FONT }}>Negotiation Call — Allianz</span>
            <span style={{ fontSize: 11, color: THEME.yellow, fontFamily: MONO, background: `${THEME.yellow}12`, padding: '2px 8px', borderRadius: 6 }}>
              OUTBOUND CALL WORKFLOW
            </span>
            <div style={{ flex: 1 }} />
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: THEME.red, opacity: Math.sin(frame * 0.1) > 0 ? 1 : 0.3 }} />
            <span style={{ fontSize: 10, color: THEME.red, fontFamily: MONO, fontWeight: 600 }}>REC</span>
          </div>

          {/* Scrolling content */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              transform: `translateY(${scrollY}px)`,
              padding: '30px 40px 250px 40px',
            }}>
              {CONVERSATION.map((item, i) => {
                if ('type' in item) {
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
                      <div style={{
                        padding: '6px 16px', borderRadius: 20,
                        background: `${item.color}12`, border: `1px solid ${item.color}22`,
                        fontSize: 13, fontFamily: MONO, color: item.color,
                      }}>
                        {item.text}
                      </div>
                    </div>
                  );
                }

                const isAgent = item.speaker === 'agent';
                return (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: isAgent ? 'flex-start' : 'flex-end',
                    marginBottom: 20,
                  }}>
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
                        fontFamily: MONO,
                      }}>
                        {item.name}
                      </span>
                    </div>

                    <div style={{
                      maxWidth: '75%', padding: '14px 20px', borderRadius: 20,
                      borderTopLeftRadius: isAgent ? 4 : 20,
                      borderTopRightRadius: isAgent ? 20 : 4,
                      background: isAgent
                        ? 'linear-gradient(135deg, rgba(255,152,47,0.15), rgba(255,152,47,0.07))'
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

            {/* Fade overlays */}
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
