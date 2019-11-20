import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import Store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';

let storeInstance = Store();


ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>
    , document.getElementById('root')
);
