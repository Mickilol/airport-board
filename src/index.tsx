import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import './modules/style/index.scss';
import App from './modules/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
