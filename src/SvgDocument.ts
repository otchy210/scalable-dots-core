import { DotProps, DotType } from './types';
import { XmlNode } from './XmlNode';

type SvgProps = {
  width: number;
  height: number;
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
  addDot(dotType: DotType, dotProps: DotProps) {
    switch (dotType) {
      case 'SQUARE':
        this.addSquareDot(dotProps);
        break;
      case 'CIRCLE':
        this.addCircleDot(dotProps);
        break;
      case 'RHOMBUS':
        this.addRhombusDot(dotProps);
        break;
    }
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
  addRhombusDot({ x, y, size, fill }: DotProps) {
    const hs = size / 2;
    const node = XmlNode.builder('path')
      .attr('d', `m${x} ${y + hs}l${hs} -${hs}l${hs} ${hs}l-${hs} ${hs}z`)
      .attr('fill', fill)
      .build();
    this.root.addChild(node);
  }
  toMinifiedXml() {
    return this.root.toMinifiedXml();
  }
  toPrettyXml(tab = '  ') {
    return this.root.toPrettyXml(tab);
  }
}
