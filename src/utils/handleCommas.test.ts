import { insertCommas, removeCommas } from './handleCommas';

test('insert commas', () => {
  const result = insertCommas(12000000);
  expect(result).toBe('12,000,000');
});

test('remove commas', () => {
  const result = removeCommas('240,000,000');
  expect(result).toBe('240000000');
});
