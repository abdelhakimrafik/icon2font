import path from 'path';
import { FontConfigType } from '@src/types';
import { FONT_EXPORT_OPTIONS } from '@core/constants';

export const generateCSS = (fontConfig: FontConfigType, prefix: string) => {
  const exportOptions = FONT_EXPORT_OPTIONS;
  let css = `@font-face {\nfont-family: '${fontConfig.name}';\nsrc: `;

  // create font-face
  for (const [i, opt] of exportOptions.entries()) {
    css += `url("${path.join('../fonts', fontConfig.name)}.${
      opt.ext
    }") format("${opt.name}")`;
    css += i === exportOptions.length - 1 ? ';\n' : ',\n';
  }

  css += `}\n.${prefix} {
    font-family: '${fontConfig.name}' !important;
    font-size: 18px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }\n`;

  for (const [name, unicode] of Object.entries(fontConfig.icons)) {
    css += `.${name}:before { content: "\\${unicode}"; }\n`;
  }

  return css;
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
