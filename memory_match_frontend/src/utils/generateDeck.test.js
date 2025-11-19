import { generateDeck } from './generateDeck';

test('generateDeck creates correct number of cards for pairs', () => {
  const pairs = 8;
  const deck = generateDeck(pairs);
  expect(deck).toHaveLength(pairs * 2);
  // Ensure every value appears exactly twice
  const counts = deck.reduce((acc, c) => {
    acc[c.value] = (acc[c.value] || 0) + 1;
    return acc;
  }, {});
  Object.values(counts).forEach((v) => expect(v).toBe(2));
});

test('generateDeck clamps pairCount to valid range', () => {
  const deck = generateDeck(1000);
  // bank has 24 entries; expect 48 cards max
  expect(deck.length).toBe(48);
});
