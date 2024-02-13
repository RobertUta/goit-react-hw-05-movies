import 'modern-normalize/modern-normalize.css';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
