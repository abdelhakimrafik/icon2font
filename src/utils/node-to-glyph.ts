import { GlyphType, GlyphsExportOptionsType, FontConfigType } from '@src/types';
import { START_UNICODE } from '@utils/constants';

const exportGlyphs = (
  nodes: ReadonlyArray<SceneNode>,
  { prefix, suffix }: GlyphsExportOptionsType
): Promise<GlyphType[]> => {
  const jobs: Promise<GlyphType>[] = [];

  for (const [index, node] of nodes.entries()) {
    jobs.push(
      node.exportAsync({ format: 'SVG' }).then((bytes) => {
        const glyph = String.fromCharCode.apply(
          null,
          bytes as unknown as number[]
        );

        const name = generateName(node.name, prefix, suffix);
        const unicode = generateUnicode(index);

        return {
          content: glyph,
          metadata: {
            name,
            unicode
          }
        };
      })
    );
  }

  return Promise.all(jobs);
};

const generateName = (name: string, prefix = '', suffix = '') => {
  return `${prefix}${name}${suffix}`.replace(/\s/g, '');
};

const generateUnicode = (index: number) => {
  return [String.fromCharCode(START_UNICODE + index)];
};

export const getFontConfig = (
  glyphs: GlyphType[],
  fontName: string
): FontConfigType => {
  const config: FontConfigType = { name: fontName, icons: {} };

  for (const glyph of glyphs) {
    config.icons[glyph.metadata.name] = glyph.metadata.unicode;
  }

  return config;
};

export default exportGlyphs;
