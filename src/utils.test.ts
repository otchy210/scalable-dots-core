import { uint8toHex, unit8toRatio } from './utils';

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

describe('uint8toRatio', () => {
  type TestSig = [number, string];
  it.each<TestSig>([
    [0, '.0'],
    [1, '.004'],
    [2, '.008'],
    [4, '.016'],
    [8, '.031'],
    [16, '.063'],
    [32, '.125'],
    [64, '.25'],
    [128, '.5'],
    [192, '.75'],
    [254, '.992'],
    [255, '1'],
    [256, '.0'],
  ])('works %d -> "%s"', (num, result) => {
    expect(unit8toRatio(num)).toBe(result);
  });
});
