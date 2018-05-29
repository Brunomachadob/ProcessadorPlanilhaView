import React from 'react';
import ReactDOM from 'react-dom';
import { loadProgressBar } from 'axios-progress-bar'

import 'axios-progress-bar/dist/nprogress.css';
import './index.css';

import App from './app/App';

loadProgressBar();

ReactDOM.render(<App/>, document.getElementById('root'));