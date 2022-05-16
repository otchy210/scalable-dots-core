export const uint8toHex = (num) => {
    const uint8 = num % 256;
    return uint8.toString(16).padStart(2, '0');
};
export const unit8toRatio = (num) => {
    const uint8 = num % 256;
    if (uint8 === 0) {
        return '.0';
    }
    else if (uint8 === 255) {
        return '1';
    }
    return (uint8 / 256).toFixed(3).slice(1).replace(/0+$/, '');
};
