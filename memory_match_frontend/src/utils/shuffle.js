'use strict';

/**
 * PUBLIC_INTERFACE
 * Shuffle an array using Fisher-Yates algorithm (non-mutating).
 * @template T
 * @param {ReadonlyArray<T>} arr - input array
 * @returns {T[]} new shuffled array
 */
export function shuffle(arr) {
  if (!Array.isArray(arr)) return [];
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}
