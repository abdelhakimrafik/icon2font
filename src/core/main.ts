import { request } from '@src/core/constants';
import { UIRequestEventType } from '@src/types';

const onMessage = ({ type, data }: UIRequestEventType) => {
  if (!type) return;

  switch (type) {
    case request.CREATE_BUNDLE:
      break;

    case request.ERROR:
      figma.notify(data, { error: true });
      break;

    default:
      console.error(`ERROR: request type ${type} unknown`);
      break;
  }
};

(function init() {
  const selectedNodes = figma.currentPage.selection.length;

  if (!selectedNodes) figma.notify('Please select at least one icon to export');

  console.log(figma.currentPage.selection);

  // render the ui
  figma.showUI(__html__, { themeColors: true, width: 730, height: 530 });
  figma.ui.onmessage = onMessage;
})();
