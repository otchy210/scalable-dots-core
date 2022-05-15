import { SvgDocument } from './SvgDocument';
import { DotProps, DotType } from './types';

describe('SvgDocument', () => {
  it('renders empty svg properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    expect(svg.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"/>'
    );
    expect(svg.toPrettyXml()).toBe(
      '<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"/>'
    );
  });
  describe('addSquareDot', () => {
    it('works', () => {
      const svg = new SvgDocument({ width: 20, height: 20 });
      svg.addSquareDot({ x: 0, y: 0, size: 10, fill: 'red' });
      svg.addSquareDot({ x: 0, y: 10, size: 10, fill: 'green' });
      svg.addSquareDot({ x: 10, y: 0, size: 10, fill: 'blue' });
      svg.addSquareDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
      expect(svg.toMinifiedXml()).toBe(
        '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m0 0h10v10h-10z" fill="red"/><path d="m0 10h10v10h-10z" fill="green"/><path d="m10 0h10v10h-10z" fill="blue"/><path d="m10 10h10v10h-10z" fill="yellow"/></svg>'
      );
    });
  });
  describe('addCircleDot', () => {
    it('works', () => {
      const svg = new SvgDocument({ width: 20, height: 20 });
      svg.addCircleDot({ x: 0, y: 0, size: 10, fill: 'red' });
      svg.addCircleDot({ x: 0, y: 10, size: 10, fill: 'green' });
      svg.addCircleDot({ x: 10, y: 0, size: 10, fill: 'blue' });
      svg.addCircleDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
      expect(svg.toMinifiedXml()).toBe(
        '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="5" cy="5" r="5" fill="red"/><circle cx="5" cy="15" r="5" fill="green"/><circle cx="15" cy="5" r="5" fill="blue"/><circle cx="15" cy="15" r="5" fill="yellow"/></svg>'
      );
    });
  });
  describe('addRhombusDot', () => {
    it('works', () => {
      const svg = new SvgDocument({ width: 20, height: 20 });
      svg.addRhombusDot({ x: 0, y: 0, size: 10, fill: 'red' });
      svg.addRhombusDot({ x: 0, y: 10, size: 10, fill: 'green' });
      svg.addRhombusDot({ x: 10, y: 0, size: 10, fill: 'blue' });
      svg.addRhombusDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
      expect(svg.toMinifiedXml()).toBe(
        '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m0 5l5 -5l5 5l-5 5z" fill="red"/><path d="m0 15l5 -5l5 5l-5 5z" fill="green"/><path d="m10 5l5 -5l5 5l-5 5z" fill="blue"/><path d="m10 15l5 -5l5 5l-5 5z" fill="yellow"/></svg>'
      );
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
