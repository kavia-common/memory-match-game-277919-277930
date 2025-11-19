'use strict';
import React from 'react';
import Card from './Card';

/**
 * PUBLIC_INTERFACE
 * Renders the grid of cards with responsive layout.
 */
export default function GameBoard({ cards, flippedIds, matchedIds, onFlip, lockBoard }) {
  return (
    <section
      className="board container"
      role="grid"
      aria-label="Memory board"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {cards.map((card, idx) => {
        const flipped = flippedIds.includes(card.id);
        const matched = matchedIds.includes(card.value);
        return (
          <div key={card.id} role="gridcell" aria-selected={flipped || matched}>
            <Card
              card={card}
              index={idx}
              flipped={flipped}
              matched={matched}
              disabled={lockBoard || matched}
              onFlip={onFlip}
            />
          </div>
        );
      })}
    </section>
  );
}
