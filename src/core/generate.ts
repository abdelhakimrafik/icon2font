import {
  DEFAULT_DELIMITER,
  DEFAULT_FONT_NAME,
  DEFAULT_PREFIX
} from '@core/constants';
import { OptionsType } from '@src/types';
import {
  exportGlyphs,
  glyphsToFontConfig,
  glyphsToSvgFont,
  svgFontToTTF,
  TTFToEot,
  TTFToWoff
} from '@core/utils';
import {
  generateCSS,
  generateHTML,
  generateSass,
  generateReactComponent
} from '@core/template';

export const iconToFont = async (
  nodes: ReadonlyArray<SceneNode>,
  options: OptionsType
) => {
  const {
    fontName = DEFAULT_FONT_NAME,
    prefix,
    suffix,
    delimiter = DEFAULT_DELIMITER,
    exportOptions
  } = options;

  const glyphs = await exportGlyphs(nodes, {
    prefix,
    suffix,
    delimiter
  });

  const fontConfig = glyphsToFontConfig(glyphs, fontName);

  const svgFont = await glyphsToSvgFont(glyphs, {
    fontName,
    fontHeight: 1000,
    normalize: true
  });

  const ttf = svgFontToTTF(svgFont);
  const woff = TTFToWoff(ttf);
  const eot = TTFToEot(ttf);

  const css = generateCSS(fontConfig, prefix || DEFAULT_PREFIX);
  const sass = exportOptions?.includes('sass')
    ? generateSass(fontConfig, prefix || DEFAULT_PREFIX)
    : null;
  const react = exportOptions?.includes('react')
    ? generateReactComponent(fontConfig, prefix || DEFAULT_PREFIX)
    : null;
  const html = generateHTML(fontConfig, prefix || DEFAULT_PREFIX);

  return {
    fontName,
    glyphs,
    fontConfig,
    ttf,
    woff,
    eot,
    css,
    sass,
    react,
    html
  };
};
