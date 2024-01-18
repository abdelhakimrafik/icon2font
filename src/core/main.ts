import { request } from '@core/constants';
import { UIRequestEventType } from '@core/types';

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
  const selectedNodes = figma.currentPage.selection;

  console.log('Selected Nodes >>', selectedNodes);

  // render the ui
  figma.showUI(__html__, { themeColors: true, width: 730, height: 530 });
  figma.ui.onmessage = onMessage;
})();
