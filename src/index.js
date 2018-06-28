import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../src/reducers/reducer.js';
import Root from './routes/routes.js';
import App from './containers/App';
import { Provider } from 'react-redux';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));


if(localStorage.getItem("user_name")) {
    ReactDOM.render(
        <Root store={store} />,
        document.getElementById('root')
    );
} else {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

registerServiceWorker();
