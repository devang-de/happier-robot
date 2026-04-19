import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME, FONT } from '../theme';

export interface KanbanCard {
  id: string;
  company: string;
  contact: string;
  value?: string;
  highlight?: boolean;
}

export interface KanbanColumn {
  title: string;
  color: string;
  cards: KanbanCard[];
}

export const KanbanBoard: React.FC<{
  columns: KanbanColumn[];
  startFrame?: number;
  moveCard?: {
    cardId: string;
    fromCol: number;
    toCol: number;
    moveFrame: number;
  };
}> = ({ columns, startFrame = 0, moveCard }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  const f = frame - startFrame;
  const boardOpacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  const isMoving = moveCard && frame >= moveCard.moveFrame;
  const moveProgress = isMoving
    ? interpolate(frame - moveCard!.moveFrame, [0, 30], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        opacity: boardOpacity,
        width: '100%',
      }}
    >
      {columns.map((col, colIdx) => {
        const colDelay = colIdx * 8;
        const colOpacity = interpolate(f, [colDelay, colDelay + 12], [0, 1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });

        return (
          <div
            key={colIdx}
            style={{
              flex: 1,
              opacity: colOpacity,
            }}
          >
            {/* Column header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
                padding: '0 4px',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: col.color,
                  fontFamily: FONT,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {col.title}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: THEME.textFaint,
                  fontFamily: FONT,
                  background: `${col.color}15`,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                {col.cards.length}
              </span>
            </div>

            {/* Cards */}
            {col.cards.map((card) => {
              const shouldHide =
                moveCard &&
                card.id === moveCard.cardId &&
                colIdx === moveCard.fromCol &&
                moveProgress > 0.5;

              const shouldAppear =
                moveCard &&
                card.id === moveCard.cardId &&
                colIdx === moveCard.toCol;

              if (shouldHide) return null;

              const cardScale =
                shouldAppear && isMoving
                  ? interpolate(moveProgress, [0.5, 1], [0.8, 1], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                    })
                  : 1;

              const cardGlow =
                shouldAppear && isMoving
                  ? interpolate(moveProgress, [0.5, 0.8, 1], [0, 0.4, 0.1], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                    })
                  : 0;

              return (
                <div
                  key={card.id}
                  style={{
                    padding: '12px 14px',
                    background: card.highlight
                      ? `linear-gradient(135deg, ${col.color}12, ${col.color}06)`
                      : 'rgba(255,255,255,0.03)',
                    borderRadius: 12,
                    border: `1px solid ${card.highlight ? `${col.color}30` : THEME.border}`,
                    marginBottom: 8,
                    transform: `scale(${cardScale})`,
                    boxShadow: cardGlow > 0 ? `0 0 20px ${col.color}${Math.round(cardGlow * 255).toString(16).padStart(2, '0')}` : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: THEME.textPrimary,
                      fontFamily: FONT,
                    }}
                  >
                    {card.company}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: THEME.textMuted,
                      fontFamily: FONT,
                      marginTop: 2,
                    }}
                  >
                    {card.contact}
                  </div>
                  {card.value && (
                    <div
                      style={{
                        fontSize: 11,
                        color: col.color,
                        fontFamily: FONT,
                        marginTop: 4,
                        fontWeight: 600,
                      }}
                    >
                      {card.value}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
