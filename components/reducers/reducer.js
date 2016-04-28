'use strict';

import { combineReducers } from 'redux';
import { REQUEST_RESULT, ADD_BARS, ADD_BAR, REMOVE_BAR } from '../actions/actions';

function barsList(state = {}, action) {
    switch(action.type) {
        case REQUEST_RESULT:
            return Object.assign({}, state, {
                term: action.term
            });
        case ADD_BARS:
            console.log('updating add bars', action.bars);
            return Object.assign({}, state, {
                bars: action.bars,
                updated: 'yes updated'
            });
        default:
            return state;
    }
}

//export default nightLifeApp;


function myList(state = [], action) {
    switch(action.type) {
        case ADD_BAR:
            return state.concat(action.bar);
        case REMOVE_BAR:
            return state.filter((bar) => {
                return bar.barId === action.barId;
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    barsList,
    myList
});

export default rootReducer;