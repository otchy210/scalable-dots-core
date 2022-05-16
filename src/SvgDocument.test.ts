import { SvgDocument } from './SvgDocument';
import { DotProps, DotType } from './types';

describe('SvgDocument', () => {
  it('renders empty svg properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    expect(svg.toMinifiedXml()).toMatchSnapshot();
    expect(svg.toPrettyXml()).toMatchSnapshot();
  });
  describe('addSquareDot', () => {
    it('works', () => {
      const svg = new SvgDocument({ width: 20, height: 20 });
      svg.addSquareDot({ x: 0, y: 0, size: 10, fill: 'red' });
      svg.addSquareDot({ x: 0, y: 10, size: 10, fill: 'green' });
      svg.addSquareDot({ x: 10, y: 0, size: 10, fill: 'blue' });
      svg.addSquareDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
      expect(svg.toPrettyXml()).toMatchSnapshot();
    });
  });
  describe('addCircleDot', () => {
    it('works', () => {
      const svg = new SvgDocument({ width: 20, height: 20 });
      svg.addCircleDot({ x: 0, y: 0, size: 10, fill: 'red' });
      svg.addCircleDot({ x: 0, y: 10, size: 10, fill: 'green' });
      svg.addCircleDot({ x: 10, y: 0, size: 10, fill: 'blue' });
      svg.addCircleDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
      expect(svg.toPrettyXml()).toMatchSnapshot();
    });
  });
  describe('addRhombusDot', () => {
    it('works', () => {
      const svg = new SvgDocument({ width: 20, height: 20 });
      svg.addRhombusDot({ x: 0, y: 0, size: 10, fill: 'red' });
      svg.addRhombusDot({ x: 0, y: 10, size: 10, fill: 'green' });
      svg.addRhombusDot({ x: 10, y: 0, size: 10, fill: 'blue' });
      svg.addRhombusDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
      expect(svg.toPrettyXml()).toMatchSnapshot();
    });
  });
  describe('addDot', () => {
    type TestSig = [type: DotType, result: string];
    const dotProps: DotProps = {
      x: 0,
      y: 0,
      size: 10,
      fill: '#000',
    };
    it.each<TestSig>([
      ['SQUARE', 'm0 0h10v10h-10z'],
      ['CIRCLE', 'r="5"'],
      ['RHOMBUS', 'm0 5l5 -5l5 5l-5 5z'],
    ])('adds proper %s', (type, result) => {
      const svg = new SvgDocument({ width: 10, height: 10 });
      svg.addDot(type, dotProps);
      expect(svg.toMinifiedXml().includes(result)).toBe(true);
    });
  });
});
