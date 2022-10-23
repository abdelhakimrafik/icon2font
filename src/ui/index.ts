import JSZip from 'jszip';
import { Buffer } from 'buffer';
import { saveAs } from 'file-saver';
import { request, response } from '@utils/constants';
import './style.scss';

const save = (data: any) => {
  const zip = new JSZip();

  zip.file(`test.ttf`, Buffer.from(data.ttf));
  zip.file(`test.svg`, Buffer.from(data.svgFont));

  zip
    .generateAsync({
      type: 'blob'
    })
    .then((file) => {
      saveAs(file, `test.zip`);
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

    if (value === '') return;

    if (opt == null) options[key] = value;
    else if (Array.isArray(opt)) opt.push(value);
    else options[key] = [opt, value];
  });

  parent.postMessage(
    { pluginMessage: { type: request.CREATE_BUNDLE, data: options } },
    '*'
  );
};

window.onload = () => {
  const form = document.getElementById('form');
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
  }
};
