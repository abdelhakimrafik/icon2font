import { request, response } from '@src/core/constants';
import { OptionsType, UIRequestEventType } from '@src/types';
import { iconToFont } from '@core/generate';
import { hasDuplicatedNames } from '@core/utils';

const onMessage = ({ type, data }: UIRequestEventType) => {
  if (!type) return;

  switch (type) {
    case request.CREATE_BUNDLE:
      createBundle(data);
      break;

    case request.NOTIFY:
      figma.notify(data, { error: true });
      break;

    default:
      console.error(`ERROR: request type ${type} unknown`);
      break;
  }
};

const postSelectedIconsNumber = () => {
  figma.ui.postMessage({
    type: response.UPDATE_ICONS_NUMBER,
    data: figma.currentPage.selection.length
  });
};

const createBundle = async (options: OptionsType) => {
  const nodes: ReadonlyArray<SceneNode> = figma.currentPage.selection;

  if (nodes.length === 0) {
    figma.ui.postMessage({
      type: response.ERROR,
      data: 'Please select at least one icon to export'
    });

    return;
  }

  if (hasDuplicatedNames(nodes)) {
    figma.ui.postMessage({
      type: response.ERROR,
      data: 'Icons has duplicated names'
    });

    return;
  }

  const fontBundle = await iconToFont(nodes, options);

  figma.ui.postMessage({ type: response.SAVE, data: fontBundle });
};

(function init() {
  const selectedNodes = figma.currentPage.selection.length;

  if (!selectedNodes) figma.notify('Please select at least one icon to export');

  // render the ui
  figma.showUI(__html__, { themeColors: true, width: 300, height: 530 });
  figma.ui.onmessage = onMessage;
  figma.on('selectionchange', postSelectedIconsNumber);

  postSelectedIconsNumber();
})();
