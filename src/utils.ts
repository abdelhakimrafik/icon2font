import fs from 'fs';

export const nodeToSvg = (node: SceneNode) => {
  if (!node) return null;

  return node.exportAsync({ format: 'SVG' }).then((bytes) => {
    return String.fromCharCode.apply(null, bytes as unknown as number[]);
  });
};

export const svgToGlyphy = (svg: string) => {
  const glyph = fs.createReadStream(svgPath) as ReadStream & {
    metadata: { unicode: string[]; name: string };
  };
  glyph.metadata = {
    unicode: getIconUnicode(_name, options.useNameAsUnicode),
    name: _name
  };
};
