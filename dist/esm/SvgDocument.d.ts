import { DotProps, DotType } from './types';
declare type SvgProps = {
    width: number;
    height: number;
};
export declare class SvgDocument {
    private root;
    constructor({ width, height }: SvgProps);
    addDot(dotType: DotType, dotProps: DotProps): void;
    addSquareDot({ x, y, size, fill }: DotProps): void;
    addCircleDot({ x, y, size, fill }: DotProps): void;
    addRhombusDot({ x, y, size, fill }: DotProps): void;
    toMinifiedXml(): string;
    toPrettyXml(tab?: string): string;
}
export {};
//# sourceMappingURL=SvgDocument.d.ts.map