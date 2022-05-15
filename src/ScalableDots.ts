import { SvgDocument } from './SvgDocument';
import { ScalableDotsProps } from './types';
import { uint8toHex, unit8toRatio } from './utils';

class ScalableDots {
  private svgDocument;
  constructor({ imageData, type, size, gap }: ScalableDotsProps) {
    const width = (size + gap) * imageData.width + gap;
    const height = (size + gap) * imageData.height + gap;
    this.svgDocument = new SvgDocument({ width, height });
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const offset = (y * imageData.width + x) * 4;
        const [r, g, b, a] = imageData.data.slice(offset, offset + 4);
        if (a === 0) {
          continue;
        }
        const fill =
          a === 255
            ? `#${uint8toHex(r)}${uint8toHex(g)}${uint8toHex(b)}`
            : `rgba(${r},${g},${b},${unit8toRatio(a)})`;
        const dotProps = {
          x: x * (size + gap),
          y: y * (size + gap),
          size,
          fill,
        };
        this.svgDocument.addDot(type, dotProps);
      }
    }
  }
  toMinifiedXml() {
    return this.svgDocument.toMinifiedXml();
  }
  toPrettyXml(tab = '  ') {
    return this.svgDocument.toPrettyXml(tab);
  }
}

export const scalableDots = (props: ScalableDotsProps) => {
  return new ScalableDots(props);
};
