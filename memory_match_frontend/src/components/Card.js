'use strict';
import React, { memo } from 'react';
import { useKeyboardActivate } from '../hooks/useKeyboardNavigation';

/**
 * PUBLIC_INTERFACE
 * A single memory card with accessible interactions.
 */
function CardBase({ card, flipped, matched, disabled, onFlip, index }) {
  const onActivate = useKeyboardActivate(() => {
    if (!disabled) onFlip(card, index);
  });

  const stateLabel = matched ? 'matched' : (flipped ? 'revealed' : 'hidden');

  return (
    <button
      type="button"
      className={`card ${flipped || matched ? 'flipped' : ''} ${matched ? 'matched' : ''}`}
      aria-label={`Card ${index + 1}, ${stateLabel}`}
      aria-pressed={flipped || matched}
      onClick={() => !disabled && onFlip(card, index)}
      onKeyDown={onActivate}
      disabled={matched}
    >
      <div className="card-inner">
        <div className="face back" aria-hidden="true">❓</div>
        <div className="face front" aria-hidden="true">{card.value}</div>
      </div>
    </button>
  );
}

const Card = memo(CardBase);
export default Card;
