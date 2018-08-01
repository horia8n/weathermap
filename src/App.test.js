import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import App from './components/App';
import reducers from './reducers';

it('renders without crashing', () => {

    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={ createStoreWithMiddleware(reducers) }>
            <App />
        </Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});