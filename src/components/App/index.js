// import {useState} from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

/** @jsx jsx */
import { ThemeProvider, jsx } from 'theme-ui'
import { theme } from '../../data/theme'

import { Layout } from '../Layout'

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout/>
      </ThemeProvider>
    </Router>
  );
}