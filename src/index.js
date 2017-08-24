import './Index/Css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Index/App';
import registerServiceWorker from './Index/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
