import { scalableDots } from './ScalableDots';

describe('scalebleDots', () => {
  it('works', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 255, 0, 192, 0, 255, 0, 0, 255, 255, 192, 192, 0, 255,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m0 0h16v16h-16z" fill="#ff0000"/><path d="m18 0h16v16h-16z" fill="#00c000"/><path d="m0 18h16v16h-16z" fill="#0000ff"/><path d="m18 18h16v16h-16z" fill="#c0c000"/></svg>'
    );
  });
});
