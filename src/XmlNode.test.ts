import { escape, XmlNode } from './XmlNode';

describe('escape', () => {
  it('returns the same if there is no chars to be escaped', () => {
    expect(escape('abc')).toBe('abc');
  });
  it.each([
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
    ["'", '&#39;'],
    ['"', '&quot;'],
  ])('escapes %s to %s properly', (char, escaped) => {
    expect(escape(`abc${char}abc${char}`)).toBe(`abc${escaped}abc${escaped}`);
  });
});

describe('XmlNode', () => {
  describe('addAttr', () => {
    it.each([
      [undefined, '<node name/>'],
      ['str', '<node name="str"/>'],
      [10, '<node name="10"/>'],
    ])('works when value is %s', (value, expected) => {
      const node = XmlNode.builder('node').build();
      node.addAttr('name', value);
      expect(node.toMinifiedXml()).toBe(expected);
    });
  });
  describe('toMinifiedXml', () => {
    it('renders no attrs no children case properly', () => {
      const node = XmlNode.builder('node').build();
      expect(node.toMinifiedXml()).toBe('<node/>');
    });
    it('renders single attr no children case properly', () => {
      const node = XmlNode.builder('node').attr('name', 'value').build();
      expect(node.toMinifiedXml()).toBe('<node name="value"/>');
    });
    it('renders no value attr no children case properly', () => {
      const node = XmlNode.builder('node').attr('name').build();
      expect(node.toMinifiedXml()).toBe('<node name/>');
    });
    it('renders xml entity value attr properly', () => {
      const node = XmlNode.builder('node').attr('name', 'a&b<c>d\'e"f').build();
      expect(node.toMinifiedXml()).toBe(
        '<node name="a&amp;b&lt;c&gt;d&#39;e&quot;f"/>'
      );
    });
    it('renders single child case properly', () => {
      const child = XmlNode.builder('child').build();
      const parent = XmlNode.builder('parent').child(child).build();
      expect(parent.toMinifiedXml()).toBe('<parent><child/></parent>');
    });
    it('renders multiple children case properly', () => {
      const child1 = XmlNode.builder('child1').build();
      const child2 = XmlNode.builder('child2').build();
      const child3 = XmlNode.builder('child3').build();
      const parent = XmlNode.builder('parent')
        .child(child1)
        .child(child2)
        .child(child3)
        .build();
      expect(parent.toMinifiedXml()).toBe(
        '<parent><child1/><child2/><child3/></parent>'
      );
    });
    it('renders nested children case properly', () => {
      const child1 = XmlNode.builder('child1').build();
      const child2 = XmlNode.builder('child2').child(child1).build();
      const child3 = XmlNode.builder('child3').child(child2).build();
      const parent = XmlNode.builder('parent').child(child3).build();
      expect(parent.toMinifiedXml()).toBe(
        '<parent><child3><child2><child1/></child2></child3></parent>'
      );
    });
    it('throws error when it is nested deeper than 16', () => {
      const children: XmlNode[] = [];
      for (let i = 0; i < 16; i++) {
        if (i === 0) {
          const child = XmlNode.builder(`child${i + 1}`).build();
          children.push(child);
        } else {
          const child = XmlNode.builder(`child${i + 1}`)
            .child(children[i - 1])
            .build();
          children.push(child);
        }
      }
      const parent = XmlNode.builder('parent').child(children.at(-1)).build();
      expect(() => {
        parent.toMinifiedXml();
      }).toThrowError();
    });
  });
  describe('toPrettyXml', () => {
    it('renders no attrs no children case properly', () => {
      const node = XmlNode.builder('node').build();
      expect(node.toPrettyXml()).toBe('<node/>');
    });
    it('renders single attr no children case properly', () => {
      const node = XmlNode.builder('node').attr('name', 'value').build();
      expect(node.toPrettyXml()).toBe('<node name="value"/>');
    });
    it('renders no value attr no children case properly', () => {
      const node = XmlNode.builder('node').attr('name').build();
      expect(node.toPrettyXml()).toBe('<node name/>');
    });
    it('renders xml entity value attr properly', () => {
      const node = XmlNode.builder('node').attr('name', 'a&b<c>d\'e"f').build();
      expect(node.toPrettyXml()).toBe(
        '<node name="a&amp;b&lt;c&gt;d&#39;e&quot;f"/>'
      );
    });
    it('renders single child case properly', () => {
      const child = XmlNode.builder('child').build();
      const parent = XmlNode.builder('parent').child(child).build();
      expect(parent.toPrettyXml()).toBe('<parent>\n  <child/>\n</parent>');
    });
    it('renders multiple children case properly', () => {
      const child1 = XmlNode.builder('child1').build();
      const child2 = XmlNode.builder('child2').build();
      const child3 = XmlNode.builder('child3').build();
      const parent = XmlNode.builder('parent')
        .child(child1)
        .child(child2)
        .child(child3)
        .build();
      expect(parent.toPrettyXml()).toBe(
        '<parent>\n  <child1/>\n  <child2/>\n  <child3/>\n</parent>'
      );
    });
    it('renders nested children case properly', () => {
      const child1 = XmlNode.builder('child1').build();
      const child2 = XmlNode.builder('child2').child(child1).build();
      const child3 = XmlNode.builder('child3').child(child2).build();
      const parent = XmlNode.builder('parent').child(child3).build();
      expect(parent.toPrettyXml()).toBe(
        '<parent>\n  <child3>\n    <child2>\n      <child1/>\n    </child2>\n  </child3>\n</parent>'
      );
    });
    it('throws error when it is nested deeper than 16', () => {
      const children: XmlNode[] = [];
      for (let i = 0; i < 16; i++) {
        if (i === 0) {
          const child = XmlNode.builder(`child${i + 1}`).build();
          children.push(child);
        } else {
          const child = XmlNode.builder(`child${i + 1}`)
            .child(children[i - 1])
            .build();
          children.push(child);
        }
      }
      const parent = XmlNode.builder('parent').child(children.at(-1)).build();
      expect(() => {
        parent.toPrettyXml();
      }).toThrowError();
    });
  });
});
