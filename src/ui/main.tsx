import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const appContainer = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(appContainer);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
