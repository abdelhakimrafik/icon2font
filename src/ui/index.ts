import JSZip from 'jszip';
import { Buffer } from 'buffer';
import path from 'path';
import { saveAs } from 'file-saver';
import { request, response } from '@src/core/constants';
import './style.scss';

(() => {
  let form: HTMLElement | null;

  const save = (data: Record<string, any>) => {
    const zip = new JSZip();
    const {
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
    } = data;

    zip.file(path.join('fonts', `${fontName}.ttf`), ttf);
    zip.file(path.join('fonts', `${fontName}.woff`), woff);
    zip.file(path.join('fonts', `${fontName}.eot`), eot);
    zip.file(path.join('css', `${fontName}.css`), Buffer.from(css));
    zip.file(`${fontName}.html`, Buffer.from(html));
    zip.file(`${fontName}.json`, Buffer.from(JSON.stringify(fontConfig)));

    if (sass) {
      zip.file(path.join('css', `${fontName}.scss`), Buffer.from(sass));
    }

    if (react) {
      zip.file(`Icon.tsx`, Buffer.from(react));
    }

    // create svg files
    for (const glyph of glyphs) {
      zip.file(
        path.join('svg', `${glyph.metadata.name}.svg`),
        Buffer.from(glyph.content)
      );
    }

    zip
      .generateAsync({
        type: 'blob'
      })
      .then((file) => {
        saveAs(file, `${fontName}.zip`);
        // set loading mode
        setLoading(false);
      })
      .catch((err) => {
        parent.postMessage(
          {
            pluginMessage: {
              type: request.ERROR,
              data: 'An error occured, Please try again'
            }
          },
          '*'
        );
        console.log('ERROR: ', err);
      });
  };

  const updateIconsNumber = (count: number) => {
    const countContainer = document.getElementById('count');
    if (countContainer) countContainer.innerHTML = count.toString();
  };

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const inputs = (e.target as HTMLFormElement).querySelectorAll('input');
    const options: Record<string, string | string[]> = {};

    // input values to object
    inputs.forEach((input) => {
      const key = input.name;
      const value = input.value;
      const opt = options[key];

      if (value === '' || (input.type === 'checkbox' && !input.checked)) return;

      if (opt == null) options[key] = value;
      else if (Array.isArray(opt)) opt.push(value);
      else options[key] = [opt, value];
    });

    // set loading mode
    setLoading(true);

    parent.postMessage(
      { pluginMessage: { type: request.CREATE_BUNDLE, data: options } },
      '*'
    );
  };

  const setLoading = (state: boolean) => {
    if (state) form?.classList.add('loading');
    else form?.classList.remove('loading');
  };

  window.onload = () => {
    form = document.getElementById('form');
    form?.addEventListener('submit', onSubmit);
  };

  window.onmessage = (msg: MessageEvent) => {
    if (!msg.data?.pluginMessage) return;

    const { type, data } = msg.data.pluginMessage;

    switch (type) {
      case response.UPDATE_ICONS_NUMBER:
        updateIconsNumber(data);
        break;

      case response.SAVE:
        save(data);
        break;

      case response.ERROR:
        setLoading(false);
        parent.postMessage(
          { pluginMessage: { type: request.ERROR, data } },
          '*'
        );
        break;
    }
  };
})();
