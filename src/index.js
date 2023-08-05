import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import './assets/index';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { store } from './app/store'
import { Provider } from 'react-redux'
import ThemeProvider from './features/auth/ThemeProvider'
import {disableReactDevTools } from '@fvilers/disable-react-devtools';

if (ProcessingInstruction.env.NODE_ENV === 'production') disableReactDevTools()
// document.body.className = "overlay-scrollbar"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}  />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>

);
