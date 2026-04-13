import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import PopUpProvider from './context/PopUpContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopUpProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PopUpProvider>
  </StrictMode>,
)
