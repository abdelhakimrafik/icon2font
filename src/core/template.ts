import path from 'path';
import { FontConfigType } from '@src/types';
import { SUPPORTED_FONTS } from '@core/constants';

const generateCssHeader = (
  { name: fontName }: Omit<FontConfigType, 'icons'>,
  prefix: string
) => {
  const exportOptions = SUPPORTED_FONTS;
  let css = `@font-face {\nfont-family: '${fontName}';\nsrc: ${exportOptions
    .map(
      ({ name: format, ext }) =>
        `url("${path.join('../fonts', fontName)}.${ext}") format("${format}")`
    )
    .join(',\n')};\n}\n`;

  css += `.${prefix} {
    font-family: '${fontName}' !important;
    font-size: 18px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }\n`;

  return css;
};

export const generateCSS = (
  { icons, ...rest }: FontConfigType,
  prefix: string
) => {
  return `${generateCssHeader(rest, prefix)}\n${Object.entries(icons)
    .map(([name, unicode]) => `.${name}:before { content: "\\${unicode}"; }\n`)
    .join('')}`;
};

export const generateSass = (
  { icons, ...rest }: FontConfigType,
  prefix: string
) => {
  return `${generateCssHeader(rest, prefix)}\n${Object.entries(icons)
    .map(([name, unicode]) => `$${name}: "\\${unicode}";\n`)
    .join('')}`;
};

export const generateHTML = (fontConfig: FontConfigType, prefix: string) => {
  let html = `<head><link rel="stylesheet" href="${path.join(
    'css',
    fontConfig.name
  )}.css"><style>
    body{background:#f0f1f3}
    .${prefix}{font-size:2em;margin-bottom:8px;color:#183153}
    .container{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));}
    .item{background:#fff;text-align:center;display:flex;flex-direction:column;border-radius:5px;padding:10px;}
    </style></head><body><div class="container">`;

  for (const [name] of Object.entries(fontConfig.icons)) {
    html += `<div class="item"><i class="${prefix} ${name}"></i>${name}</div>`;
  }

  return html + '</div></body>';
};
