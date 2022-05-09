import { SvgDocument } from './SvgDocument';

describe('SvgDocument', () => {
  it('renders empty svg properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    expect(svg.toMinifiedXml()).toBe(
      '<?xml version="1.0"?>\n<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"/>'
    );
  });
  it('renders rect element properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    svg.addRect({ x: 0, y: 10, width: 50, height: 60, fill: 'grey' });
    expect(svg.toMinifiedXml()).toBe(
      '<?xml version="1.0"?>\n<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"><rect x="0" y="10" width="50" height="60" fill="grey"/></svg>'
    );
  });
  it('renders circle element properly', () => {
    const svg = new SvgDocument({ width: 50, height: 100 });
    svg.addCircle({ cx: 5, cy: 10, r: 20, fill: 'grey' });
    expect(svg.toMinifiedXml()).toBe(
      '<?xml version="1.0"?>\n<svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="5" cy="10" r="20" fill="grey"/></svg>'
    );
  });
});
