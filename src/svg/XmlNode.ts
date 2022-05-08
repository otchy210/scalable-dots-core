const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
};

const escape = (str: string) => {
  return str.replace(/[&<>'"]/g, (ch) => XML_ENTITIES[ch] ?? '');
};

export class XmlNode {
  private name: string;
  public readonly attrs: Record<string, string>;
  public readonly children: XmlNode[];
  constructor(
    name: string,
    attrs: Record<string, string>,
    children: XmlNode[]
  ) {
    this.name = name;
    this.attrs = attrs;
    this.children = children;
  }
  private toTagBody() {
    if (Object.keys(this.attrs).length === 0) {
      return this.name;
    }
    return `${this.name} ${Object.entries(this.attrs)
      .map(([name, value]) => {
        if (name === value) {
          return name;
        } else {
          return `${name}="${escape(value)}"`;
        }
      })
      .join(' ')}`;
  }
  private innerToMinifiedXml(depth: number) {
    if (depth > 16) {
      throw new Error('XmlNode depth must be less than 16.');
    }
    if (this.children.length === 0) {
      return `<${this.toTagBody()}/>`;
    } else {
      const texts: string[] = [];
      texts.push(`<${this.toTagBody()}>`);
      this.children.forEach((child) =>
        texts.push(child.innerToMinifiedXml(depth + 1))
      );
      texts.push(`</${this.name}>`);
      return texts.join('');
    }
  }
  toMinifiedXml() {
    return this.innerToMinifiedXml(1);
  }

  static builder(name: string) {
    return new XmlNodeBuilder(name);
  }
}

export class XmlNodeBuilder {
  private name: string;
  private attrs: Record<string, string>;
  private children: XmlNode[];
  constructor(name: string) {
    this.name = name;
    this.attrs = {};
    this.children = [];
  }
  attr(name: string, value?: string) {
    this.attrs[name] = value ?? name;
    return this;
  }
  child(child: XmlNode | undefined) {
    if (child) {
      this.children.push(child);
    }
    return this;
  }
  build() {
    return new XmlNode(this.name, this.attrs, this.children);
  }
}
