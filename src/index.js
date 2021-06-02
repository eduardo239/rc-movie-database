import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/bootstrap-grid.min.css';
import './css/index.css';
import './css/App.css';
import './css/spinner.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
