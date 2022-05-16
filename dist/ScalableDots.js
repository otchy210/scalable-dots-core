"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scalableDots = void 0;
const SvgDocument_1 = require("./SvgDocument");
const utils_1 = require("./utils");
class ScalableDots {
    svgDocument;
    constructor({ imageData, type, size, gap }) {
        const width = (size + gap) * imageData.width + gap;
        const height = (size + gap) * imageData.height + gap;
        this.svgDocument = new SvgDocument_1.SvgDocument({ width, height });
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                const offset = (y * imageData.width + x) * 4;
                const [r, g, b, a] = imageData.data.slice(offset, offset + 4);
                if (a === 0) {
                    continue;
                }
                const fill = a === 255
                    ? `#${(0, utils_1.uint8toHex)(r)}${(0, utils_1.uint8toHex)(g)}${(0, utils_1.uint8toHex)(b)}`
                    : `rgba(${r},${g},${b},${(0, utils_1.unit8toRatio)(a)})`;
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
const scalableDots = (props) => {
    return new ScalableDots(props);
};
exports.scalableDots = scalableDots;
