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
  it('renders rect element properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    svg.addRect({ x: 0, y: 10, width: 50, height: 60, fill: 'grey' });
    expect(svg.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"><rect x="0" y="10" width="50" height="60" fill="grey"/></svg>'
    );
  });
  it('renders circle element properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    svg.addCircle({ cx: 5, cy: 10, r: 20, fill: 'grey' });
    expect(svg.toMinifiedXml()).toBe(
      '<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="5" cy="10" r="20" fill="grey"/></svg>'
    );
  });
});
