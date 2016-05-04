'use strict';

import { combineReducers } from 'redux';
import { 
    SET_USER_BAR_LIST, 
    SEARCH_TERM, 
    ADD_BARS, 
    ADD_BAR, 
    REMOVE_BAR, 
    ADD_USERNAME,
    LOG_OUT
} from '../actions/actions';

function barsList(state = {isFetching: false}, action) {
    switch(action.type) {
        case SEARCH_TERM:
            return Object.assign({}, state, {
                term: action.term,
                isFetching: true
            });
        case ADD_BARS:
            return Object.assign({}, state, {
                bars: action.bars,
                updated: 'yes updated',
                isFetching: false
            });
        case REMOVE_BAR:
            // Decrease goingNumber from bars if removed from user list.
            let filteredBars = state.bars.map(bar => {
                if (bar.id === action.barId && bar.goingNumber && bar.goingNumber > 0) {
                    bar.goingNumber--;
                }
                return bar;
            });
            return Object.assign({}, state, {
                bars: filteredBars
            });
        case ADD_BAR:
            console.log('---action bar', action.bar)
            let newBars = state.bars.map(bar => {
                if (bar.id === action.bar.id) {
                    if (bar.goingNumber === undefined) {
                        bar.goingNumber = 1;
                    } else {
                        bar.goingNumber++;
                    }
                }
                return bar;
            });
            return Object.assign({}, state, {
                bars: newBars
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
        case LOG_OUT:
            return [];
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
        case LOG_OUT:
            return {};
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