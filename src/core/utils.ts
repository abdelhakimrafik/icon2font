import { Readable } from 'stream';
import svg2ttf from 'svg2ttf';
import ttf2woff from 'ttf2woff';
import ttf2eot from 'ttf2eot';
import SVGIcons2SVGFontStream from 'svgicons2svgfont';
import { COPYRIGHT, START_UNICODE } from '@core/constants';
import {
  GlyphType,
  GlyphsExportOptionsType,
  FontConfigType,
  glyphsToSvgFontOptions,
  GlyphStreamType
} from '@src/types';

const generateName = (
  name: string,
  { prefix, suffix, delimiter }: GlyphsExportOptionsType
) => {
  return `${prefix ? prefix + delimiter : ''}${name}${
    suffix ? delimiter + suffix : ''
  }`.replace(/[^a-zA-Z0-9-_]+/g, '');
};

const generateUnicode = (index: number) => {
  return String.fromCharCode(START_UNICODE + index);
};

export const exportGlyphs = (
  nodes: ReadonlyArray<SceneNode>,
  options: GlyphsExportOptionsType
): Promise<GlyphType[]> => {
  const jobs: Promise<GlyphType>[] = [];

  for (const [index, node] of nodes.entries()) {
    jobs.push(
      node.exportAsync({ format: 'SVG' }).then((bytes) => {
        const glyph = String.fromCharCode.apply(
          null,
          bytes as unknown as number[]
        );

        const name = generateName(node.name, options);
        const unicode = generateUnicode(index);

        return {
          content: glyph,
          metadata: {
            name,
            unicode: [unicode]
          }
        };
      })
    );
  }

  return Promise.all(jobs);
};

export const glyphsToFontConfig = (
  glyphs: GlyphType[],
  fontName: string
): FontConfigType => {
  const config: FontConfigType = { name: fontName, icons: {} };

  for (const glyph of glyphs) {
    config.icons[glyph.metadata.name] = glyph.metadata.unicode[0]
      .charCodeAt(0)
      .toString(16);
  }

  return config;
};

export const glyphsToSvgFont = (
  glyphs: GlyphType[],
  options?: glyphsToSvgFontOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let result = '';
    const fontStream = new SVGIcons2SVGFontStream(options)
      .on('end', () => resolve(result))
      .on('data', (data) => {
        result += data;
      })
      .on('error', reject);

    for (const glyph of glyphs) {
      const glyphStream: GlyphStreamType = new Readable();

      glyphStream.push(glyph.content);
      glyphStream.push(null); // end stream
      glyphStream.metadata = glyph.metadata;

      fontStream.write(glyphStream);
    }

    fontStream.end();
  });
};

export const hasDuplicatedNames = (nodes: ReadonlyArray<SceneNode>) => {
  const names: string[] = [];

  for (const node of nodes) {
    if (names.includes(node.name)) return true;
    names.push(node.name);
  }

  return false;
};

export const svgFontToTTF = (svgFont: string) => {
  return Buffer.from(svg2ttf(svgFont, { copyright: COPYRIGHT }).buffer);
};

export const TTFToWoff = (ttf: Buffer): Buffer => {
  return Buffer.from(ttf2woff(ttf).buffer);
};

export const TTFToEot = (ttf: Buffer): Buffer => {
  return Buffer.from(ttf2eot(ttf).buffer);
};
