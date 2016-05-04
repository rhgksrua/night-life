import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import nightLifeApp from './reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { searchTerm, getSearchResult } from './actions/actions';

// Adding scss
require('../styles/index.scss');

import App from './App';
import Home from './Home';
import Me from './Me';
import MeContainer from './containers/MeContainer';
import NoMatch from './NoMatch';

const loggerMiddleware = createLogger();

let store = createStore(nightLifeApp, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='me' component={MeContainer} />
            </Route>
            <Route path='*' component={NoMatch} />
        </Router>
    </Provider>
), document.getElementById('app'));