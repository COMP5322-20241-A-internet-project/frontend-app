import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import StateProvider from './StateProvider';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
const customTheme = createTheme({
  palette:{
    primary:{
      main: '#00205b',
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </StateProvider>
);
