(function init() {
  const selectedNodes = figma.currentPage.selection.length;

  if (!selectedNodes) {
    figma.notify('Please select at least one icon to export');
  }

  // render the ui
  figma.showUI(__html__, { themeColors: true, width: 400, height: 600 });
})();
