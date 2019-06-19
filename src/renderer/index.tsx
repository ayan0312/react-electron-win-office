import React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root/Root';

import store from './store/configureStore';
import './index.css';

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(Root);
