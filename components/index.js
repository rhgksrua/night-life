import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';


import App from './App';
import Home from './Home';
import Me from './Me';


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='me' component={Me} />
        </Route>
    </Router>
), document.getElementById('app'));