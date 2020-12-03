import React from 'react';
import ReactDOM from 'react-dom';
import ContainerBase from "components/Container";
import { Provider } from 'react-redux';
//import { BrowserRouter } from 'react-router-dom';
import store from "./store";
import CssBaseline from '@material-ui/core/CssBaseline'
import CustomThemeProvider from "components/CustomThemeProvider";

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <CssBaseline />
      <ContainerBase />
    </CustomThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
