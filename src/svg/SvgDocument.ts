import { XmlNode } from './XmlNode';

const XML_DECLARATION = '<?xml version="1.0"?>\n';

type SvgProps = {
  width: number;
  height: number;
};

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

type CircleProps = {
  cx: number;
  cy: number;
  r: number;
  fill: string;
};

export class SvgDocument {
  private root: XmlNode;

  constructor({ width, height }: SvgProps) {
    this.root = XmlNode.builder('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('version', '1.1')
      .build();
  }
  addRect({ x, y, width, height, fill }: RectProps) {
    const node = XmlNode.builder('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', fill)
      .build();
    this.root.addChild(node);
  }
  addCircle({ cx, cy, r, fill }: CircleProps) {
    const node = XmlNode.builder('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('fill', fill)
      .build();
    this.root.addChild(node);
  }
  toMinifiedXml() {
    return `${XML_DECLARATION}${this.root.toMinifiedXml()}`;
  }
  toPrettyXml() {
    return `${XML_DECLARATION}${this.root.toPrettyXml()}`;
  }
}
