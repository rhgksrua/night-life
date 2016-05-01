'use strict';

import { combineReducers } from 'redux';
import { SET_USER_BAR_LIST, REQUEST_RESULT, ADD_BARS, ADD_BAR, REMOVE_BAR, ADD_USERNAME } from '../actions/actions';

function barsList(state = {isFetching: false}, action) {
    switch(action.type) {
        case REQUEST_RESULT:
            return Object.assign({}, state, {
                term: action.term,
                isFetching: true
            });
        case ADD_BARS:
            console.log('updating add bars', action.bars);
            return Object.assign({}, state, {
                bars: action.bars,
                updated: 'yes updated',
                isFetching: false
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
                //console.log('reducer bar', bar.barId, action.barId);
                return bar.id !== action.barId;
            });
        case SET_USER_BAR_LIST:
            return action.list;
        default:
            return state;
    }
}

function userInfo(state = {}, action) {
    switch(action.type) {
        case ADD_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    barsList,
    myList,
    userInfo
});

export default rootReducer;