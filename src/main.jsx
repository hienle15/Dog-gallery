// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import { store } from './App/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Bọc component App bằng Provider và truyền store vào */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);