export declare type DotProps = {
    x: number;
    y: number;
    size: number;
    fill: string;
};
export declare type DotType = 'SQUARE' | 'CIRCLE' | 'RHOMBUS';
export declare type ImageData = {
    width: number;
    height: number;
    data: Uint8ClampedArray;
};
export declare type ScalableDotsProps = {
    imageData: ImageData;
    type: DotType;
    size: number;
    gap: number;
};
//# sourceMappingURL=types.d.ts.map