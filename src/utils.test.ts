import { uint8toHex } from './utils';

describe('uint8toHex', () => {
  type TestSig = [number, string];
  it.each<TestSig>([
    [0, '00'],
    [1, '01'],
    [15, '0f'],
    [16, '10'],
    [255, 'ff'],
    [256, '00'],
  ])('works %d -> "%s"', (num, result) => {
    expect(uint8toHex(num)).toBe(result);
  });
});
