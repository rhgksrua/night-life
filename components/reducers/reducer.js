'use strict';

import { combineReducers } from 'redux';
import { REQUEST_RESULT } from '../actions/index';


function nightLifeApp(state = {}, action) {
    switch(action.type) {
        case REQUEST_RESULT:
            return action.term;
        default:
            return state;
    }
}

export default nightLifeApp;