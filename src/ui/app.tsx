import React from 'react';

const App = () => {
  const createRec = () => {
    parent.postMessage({ pluginMessage: { type: 'create-icons' } }, '*');
  };

  return (
    <div className='container'>
      <h1>Hello world</h1>
      <button onClick={createRec}>Create</button>
    </div>
  );
};

export default App;
