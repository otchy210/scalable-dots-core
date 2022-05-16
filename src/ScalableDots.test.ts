import { scalableDots } from './ScalableDots';

describe('scalebleDots', () => {
  it('renders RGB case properly', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 255, 0, 192, 0, 255, 0, 0, 255, 255, 192, 192, 0, 255,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toPrettyXml()).toMatchSnapshot();
  });
  it('renders half-transparent case properly', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 128, 0, 192, 0, 128, 0, 0, 255, 128, 192, 192, 0, 128,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toPrettyXml()).toMatchSnapshot();
  });
  it('renders transparent case properly', () => {
    const data = new Uint8ClampedArray([
      255, 0, 0, 0, 0, 192, 0, 128, 0, 0, 255, 255, 192, 192, 0, 0,
    ]);
    const imageData = { width: 2, height: 2, data };

    const dots = scalableDots({ imageData, type: 'SQUARE', size: 16, gap: 2 });
    expect(dots.toPrettyXml()).toMatchSnapshot();
  });

  describe('toMinifiedXml', () => {
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
        dots.toMinifiedXml();
      }).not.toThrowError();
    });
  });
});
