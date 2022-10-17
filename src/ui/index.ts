document.getElementById('submit')?.addEventListener('click', (e) => {
  console.log('>> called');
  parent.postMessage(
    { pluginMessage: { type: 'create-rectangles', count: 5 } },
    '*'
  );
});
