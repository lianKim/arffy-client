import { convertDateFormat } from './convertDateFormat';

test('convert date format', () => {
  const date = convertDateFormat('1994-08-11T10:01:00');
  expect(date).toBe('1994.08.11');
});

test('convert date format', () => {
  const date = convertDateFormat('1994년08월11일');
  expect(date).toBe('1994.08.11');
});
