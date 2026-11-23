import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { config } from './config';
import { initTheme } from './utils/theme';
import './styles/index.css';

initTheme(config.theme);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
