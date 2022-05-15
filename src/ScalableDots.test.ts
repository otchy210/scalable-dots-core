import { scalableDots } from './ScalableDots';

describe('scalebleDots', () => {
  it('renders RGB case properly', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 255, 0, 192, 0, 255, 0, 0, 255, 255, 192, 192, 0, 255,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m0 0h16v16h-16z" fill="#ff0000"/><path d="m18 0h16v16h-16z" fill="#00c000"/><path d="m0 18h16v16h-16z" fill="#0000ff"/><path d="m18 18h16v16h-16z" fill="#c0c000"/></svg>'
    );
  });
  it('renders half-transparent case properly', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 128, 0, 192, 0, 128, 0, 0, 255, 128, 192, 192, 0, 128,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m0 0h16v16h-16z" fill="rgba(255,0,0,.5)"/><path d="m18 0h16v16h-16z" fill="rgba(0,192,0,.5)"/><path d="m0 18h16v16h-16z" fill="rgba(0,0,255,.5)"/><path d="m18 18h16v16h-16z" fill="rgba(192,192,0,.5)"/></svg>'
    );
  });
  it('renders transparent case properly', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 0, 0, 192, 0, 128, 0, 0, 255, 255, 192, 192, 0, 0,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m18 0h16v16h-16z" fill="rgba(0,192,0,.5)"/><path d="m0 18h16v16h-16z" fill="#0000ff"/></svg>'
    );
  });

  describe('toPrettyXml', () => {
    it("doesn't throw error", () => {
      const data = new Uint8ClampedArray([
        255, 0, 0, 255, 0, 192, 0, 255, 0, 0, 255, 255, 192, 192, 0, 255,
      ]);
      const imageData = { width: 2, height: 2, data };

      const dots = scalableDots({
        imageData,
        type: 'SQUARE',
        size: 16,
        gap: 2,
      });
      expect(() => {
        dots.toPrettyXml();
      }).not.toThrowError();
    });
  });
});
