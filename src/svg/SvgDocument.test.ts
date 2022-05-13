import { SvgDocument } from './SvgDocument';

describe('SvgDocument', () => {
  it('renders empty svg properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    expect(svg.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"/>'
    );
  });
  it('renders square dot element properly', () => {
    const svg = new SvgDocument({ width: 20, height: 20 });
    svg.addSquareDot({ x: 0, y: 0, size: 10, fill: 'red' });
    svg.addSquareDot({ x: 0, y: 10, size: 10, fill: 'green' });
    svg.addSquareDot({ x: 10, y: 0, size: 10, fill: 'blue' });
    svg.addSquareDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
    expect(svg.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="m0 0h10v10h-10z" fill="red"/><path d="m0 10h10v10h-10z" fill="green"/><path d="m10 0h10v10h-10z" fill="blue"/><path d="m10 10h10v10h-10z" fill="yellow"/></svg>'
    );
  });
  it('renders circle dot element properly', () => {
    const svg = new SvgDocument({ width: 20, height: 20 });
    svg.addCircleDot({ x: 0, y: 0, size: 10, fill: 'red' });
    svg.addCircleDot({ x: 0, y: 10, size: 10, fill: 'green' });
    svg.addCircleDot({ x: 10, y: 0, size: 10, fill: 'blue' });
    svg.addCircleDot({ x: 10, y: 10, size: 10, fill: 'yellow' });
    expect(svg.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="5" cy="5" r="5" fill="red"/><circle cx="5" cy="15" r="5" fill="green"/><circle cx="15" cy="5" r="5" fill="blue"/><circle cx="15" cy="15" r="5" fill="yellow"/></svg>'
    );
  });
  it('renders rhombus dot element properly', () => {
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
