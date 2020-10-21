import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { DataProvider } from './components/ContextData'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider initalState={{}}>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
