const XML_ENTITIES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
};
export const escape = (str) => {
    return str.replace(/[&<>'"]/g, (ch) => XML_ENTITIES[ch]);
};
export class XmlNode {
    tagName;
    attrs;
    children;
    constructor(tagName, attrs, children) {
        this.tagName = tagName;
        this.attrs = attrs;
        this.children = children;
    }
    addAttr(name, value) {
        if (typeof value === 'number') {
            this.attrs[name] = String(value);
        }
        else {
            this.attrs[name] = value ?? name;
        }
    }
    addChild(child) {
        this.children.push(child);
    }
    toTagBody() {
        if (Object.keys(this.attrs).length === 0) {
            return this.tagName;
        }
        return `${this.tagName} ${Object.entries(this.attrs)
            .map(([name, value]) => {
            if (name === value) {
                return name;
            }
            else {
                return `${name}="${escape(value)}"`;
            }
        })
            .join(' ')}`;
    }
    innerToMinifiedXml(depth) {
        if (depth >= 16) {
            throw new Error('XmlNode depth must be less than 16.');
        }
        if (this.children.length === 0) {
            return `<${this.toTagBody()}/>`;
        }
        else {
            const texts = [];
            texts.push(`<${this.toTagBody()}>`);
            this.children.forEach((child) => texts.push(child.innerToMinifiedXml(depth + 1)));
            texts.push(`</${this.tagName}>`);
            return texts.join('');
        }
    }
    toMinifiedXml() {
        return this.innerToMinifiedXml(0);
    }
    innerToPrettyXml(tab, depth) {
        if (depth >= 16) {
            throw new Error('XmlNode depth must be less than 16.');
        }
        const tabs = tab.repeat(depth);
        if (this.children.length === 0) {
            return `${tabs}<${this.toTagBody()}/>\n`;
        }
        else {
            const texts = [];
            texts.push(`${tabs}<${this.toTagBody()}>\n`);
            this.children.forEach((child) => texts.push(child.innerToPrettyXml(tab, depth + 1)));
            texts.push(`${tabs}</${this.tagName}>\n`);
            return texts.join('');
        }
    }
    toPrettyXml(tab = '  ') {
        return this.innerToPrettyXml(tab, 0).trim();
    }
    static builder(name) {
        return new XmlNodeBuilder(name);
    }
}
export class XmlNodeBuilder {
    tagName;
    attrs;
    children;
    constructor(name) {
        this.tagName = name;
        this.attrs = {};
        this.children = [];
    }
    attr(name, value) {
        if (typeof value === 'number') {
            this.attrs[name] = String(value);
        }
        else {
            this.attrs[name] = value ?? name;
        }
        return this;
    }
    child(child) {
        if (child) {
            this.children.push(child);
        }
        return this;
    }
    build() {
        return new XmlNode(this.tagName, this.attrs, this.children);
    }
}
