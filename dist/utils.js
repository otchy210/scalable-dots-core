"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit8toRatio = exports.uint8toHex = void 0;
const uint8toHex = (num) => {
    const uint8 = num % 256;
    return uint8.toString(16).padStart(2, '0');
};
exports.uint8toHex = uint8toHex;
const unit8toRatio = (num) => {
    const uint8 = num % 256;
    if (uint8 === 0) {
        return '.0';
    }
    else if (uint8 === 255) {
        return '1';
    }
    return (uint8 / 256).toFixed(3).slice(1).replace(/0+$/, '');
};
exports.unit8toRatio = unit8toRatio;
