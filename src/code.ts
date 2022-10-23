import { request, response } from '@utils/constants';
import { iconsToFont } from '@utils/index';
import { OptionsType, UIRequestEventType } from '@src/types';

const onMessage = ({ type, data }: UIRequestEventType) => {
  if (!type) return;

  switch (type) {
    case request.CREATE_BUNDLE:
      createBandle(data);
      break;
  }
};

const postSelectedIconsNumber = () => {
  figma.ui.postMessage({
    type: response.UPDATE_ICONS_NUMBER,
    data: figma.currentPage.selection.length
  });
};

const createBandle = async (options: OptionsType) => {
  const nodes: ReadonlyArray<SceneNode> = figma.currentPage.selection;

  if (nodes.length === 0) {
    figma.notify('Please select at least one icon to export', { error: true });

    return;
  }

  // TODO: check for duplicate names

  const font = await iconsToFont(nodes, options);
  console.log(font);

  // TODO: notify ui to save generated streams (result)
  figma.ui.postMessage({ type: response.SAVE, data: font });

  // figma.closePlugin();
};

(function init() {
  const selectedNodes: number = figma.currentPage.selection.length;

  if (!selectedNodes) figma.notify('Please select at least one icon to export');

  // render the ui
  figma.showUI(__html__, { themeColors: true, width: 300, height: 530 });
  figma.ui.onmessage = onMessage;
  figma.on('selectionchange', postSelectedIconsNumber);

  postSelectedIconsNumber();
})();
