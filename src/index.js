import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom'
import theme from 'theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </Router>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
