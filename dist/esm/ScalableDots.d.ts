import { ScalableDotsProps } from './types';
declare class ScalableDots {
    private svgDocument;
    constructor({ imageData, type, size, gap }: ScalableDotsProps);
    toMinifiedXml(): string;
    toPrettyXml(tab?: string): string;
}
export declare const scalableDots: (props: ScalableDotsProps) => ScalableDots;
export {};
//# sourceMappingURL=ScalableDots.d.ts.map