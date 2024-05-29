import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
  const root = ReactDOM.createRoot(rootDomElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}