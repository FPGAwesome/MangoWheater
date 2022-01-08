import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import './index.less';
import { CustomProvider } from 'rsuite';

ReactDOM.render(
  <CustomProvider theme="dark"><App /></CustomProvider>,
  document.getElementById('root')
);

