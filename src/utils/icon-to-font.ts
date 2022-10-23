import SVGIcons2SVGFontStream, { SvgIcons2FontOptions } from 'svgicons2svgfont';
import { Readable } from 'stream';
import svg2ttf from 'svg2ttf';
import { exportGlyphs, getFontConfig } from '@utils/index';
import { GlyphType, OptionsType } from '@src/types';
import { DEFAULT_FONT_NAME } from '@utils/constants';

const iconsToFont = async (
  nodes: ReadonlyArray<SceneNode>,
  options: OptionsType
) => {
  console.log('OPT >>', options);

  const { fontName = DEFAULT_FONT_NAME, prefix, suffix } = options;

  const glyphs = await exportGlyphs(nodes, {
    prefix,
    suffix
  });
  const fontConfig = getFontConfig(glyphs, fontName);

  console.log(glyphs);
  console.log(fontConfig);

  const font = await glyphsToFontData(glyphs, {
    fontName,
    fontHeight: 1000,
    normalize: true
  }).catch((err) => console.log('ERROR: ', err));

  return {
    svgFont: font,
    ttf: svg2ttf(font as string)
  };
};

const glyphsToFontData = (
  glyphs: GlyphType[],
  options?: SvgIcons2FontOptions
) => {
  return new Promise((resolve, reject) => {
    let result = '';
    const fontStream = new SVGIcons2SVGFontStream(options)
      .on('end', () => resolve(result))
      .on('data', (data) => {
        result += data;
      })
      .on('error', reject);

    for (const glyph of glyphs) {
      const glyphStream: Readable & {
        metadata?: { unicode: string[]; name: string };
      } = new Readable();

      glyphStream.push(glyph.content);
      glyphStream.push(null);
      glyphStream.metadata = glyph.metadata;

      fontStream.write(glyphStream);
    }

    fontStream.end();
  });
};

export default iconsToFont;
