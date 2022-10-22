import { request, response } from '@utils/constants';

// render the ui
figma.showUI(__html__, { themeColors: true, width: 300, height: 435 });

figma.ui.onmessage = async (msg) => {
  if (!msg?.type) return null;

  const [type, options] = msg;

  switch (type) {
    case request.CREATE_BUNDLE:
      createBandle(options);
      break;

    case request.GET_ICONS_NUMBER:
      figma.ui.postMessage({
        type: response.UPDATE_ICONS_NUMBER,
        count: figma.currentPage.selection.length
      });
      break;
  }

  figma.closePlugin();
};

const createBandle = (options: Record<string, string | string[]>) => {
  const nodes: readonly SceneNode[] = figma.currentPage.selection;

  // no icon selected
  if (nodes.length === 0)
    return figma.closePlugin('Please select at least one icon to export');
};
