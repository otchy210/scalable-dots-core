export declare const escape: (str: string) => string;
export declare class XmlNode {
    private tagName;
    attrs: Record<string, string>;
    children: XmlNode[];
    constructor(tagName: string, attrs: Record<string, string>, children: XmlNode[]);
    addAttr(name: string, value?: string | number): void;
    addChild(child: XmlNode): void;
    private toTagBody;
    private innerToMinifiedXml;
    toMinifiedXml(): string;
    private innerToPrettyXml;
    toPrettyXml(tab?: string): string;
    static builder(name: string): XmlNodeBuilder;
}
export declare class XmlNodeBuilder {
    private tagName;
    private attrs;
    private children;
    constructor(name: string);
    attr(name: string, value?: string | number): this;
    child(child: XmlNode | undefined): this;
    build(): XmlNode;
}
//# sourceMappingURL=XmlNode.d.ts.map