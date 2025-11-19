import { shuffle } from './shuffle';

test('shuffle returns a new array with same elements', () => {
  const arr = [1, 2, 3, 4];
  const out = shuffle(arr);
  expect(out).not.toBe(arr);
  expect(out.sort()).toEqual(arr.slice().sort());
});

test('shuffle handles non-array safely', () => {
  expect(shuffle(null)).toEqual([]);
});
