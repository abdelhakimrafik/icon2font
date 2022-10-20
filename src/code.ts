import nodesToFont from './utils/nodesToFont';

// render the ui
figma.showUI(__html__, { themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-icons') {
    const nodes: readonly SceneNode[] = figma.currentPage.selection;

    // no icon selected
    if (nodes.length === 0)
      return figma.closePlugin('Please select at least one icon to export');

    await nodesToFont(nodes);
  }

  figma.closePlugin();
};
