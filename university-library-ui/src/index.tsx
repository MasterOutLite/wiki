import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';

import App from 'src/components/App';
import Routes from 'src/Routes';


import theme from 'src/styles/theme.material';
import 'src/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App>
      <Routes/>
    </App>
  </ThemeProvider>
);
