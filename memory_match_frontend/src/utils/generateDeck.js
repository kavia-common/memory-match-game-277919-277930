'use strict';
import { shuffle } from './shuffle';

/**
 * PUBLIC_INTERFACE
 * Generate a memory game deck with paired items.
 * @param {number} pairCount - number of unique pairs (default 8)
 * @returns {Array<{id:string, value:string}>}
 */
export function generateDeck(pairCount = 8) {
  const bank = [
    '🐶','🐱','🦊','🐼','🦁','🐸','🐵','🦄',
    '🐙','🐠','🦋','🌸','🍀','🍎','🍉','🍰',
    '⚽','🎲','🎧','🎯','🚗','✈️','🚀','⛵',
  ];
  const safeCount = Math.max(1, Math.min(pairCount, bank.length));
  const base = bank.slice(0, safeCount);
  const pairs = base.flatMap((v, idx) => ([
    { id: `${idx}-a`, value: v },
    { id: `${idx}-b`, value: v },
  ]));
  return shuffle(pairs);
}
