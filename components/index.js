import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';


import App from './App';
import Home from './Home';
import Me from './Me';
import NoMatch from './NoMatch';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='me' component={Me} />
        </Route>
        <Route path='*' component={NoMatch} />
    </Router>
), document.getElementById('app'));