import React from 'react';
import './App.css';
import { ThemeProvider } from "styled-components";
import {theme} from "./theme/theme";

//REDUX
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Home from "./views/home";

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Home/>
          </ThemeProvider>
      </Provider>
  );
}

export default App;
