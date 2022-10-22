import { request, response } from '@utils/constants';
import './style.scss';

window.onload = () => {
  const form = document.getElementById('form');
  form?.addEventListener('submit', onSubmit);

  // get number of selected icons
  parent.postMessage(
    { pluginMessage: { type: request.GET_ICONS_NUMBER } },
    '*'
  );
};

window.onmessage = (msg: MessageEvent) => {
  console.log('>>', msg);

  if (!msg.data?.pluginMessage) {
    return;
  }

  const { type, data } = msg.data.pluginMessage;

  switch (type) {
    case response.UPDATE_ICONS_NUMBER:
      updateIconsNumber(data.count);
      break;
  }
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

    if (opt == null) options[key] = value;
    else if (Array.isArray(opt)) opt.push(value);
    else options[key] = [opt, value];
  });

  parent.postMessage(
    { pluginMessage: { type: request.CREATE_BUNDLE, options } },
    '*'
  );
};

const updateIconsNumber = (count: number) => {
  const countContainer = document.getElementById('count');
  if (countContainer) countContainer.innerHTML = count.toString();
};
