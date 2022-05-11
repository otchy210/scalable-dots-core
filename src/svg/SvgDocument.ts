import { XmlNode } from './XmlNode';

type SvgProps = {
  width: number;
  height: number;
};

type DotProps = {
  x: number;
  y: number;
  size: number;
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
  addSquareDot({ x, y, size, fill }: DotProps) {
    const node = XmlNode.builder('path')
      .attr('d', `m${x} ${y}h${size}v${size}h-${size}z`)
      .attr('fill', fill)
      .build();
    this.root.addChild(node);
  }
  addCircleDot({ x, y, size, fill }: DotProps) {
    const r = size / 2;
    const cx = x + r;
    const cy = y + r;
    const node = XmlNode.builder('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('fill', fill)
      .build();
    this.root.addChild(node);
  }
  toMinifiedXml() {
    return this.root.toMinifiedXml();
  }
  toPrettyXml() {
    return this.root.toPrettyXml();
  }
}
