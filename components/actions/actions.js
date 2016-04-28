'use strict';

// actions

import fetch from 'isomorphic-fetch';
import Yelp from 'yelp';

export const SEARCH_TERM = 'bar';

export const REQUEST_RESULT = 'REQUEST_RESULT';
export const ADD_BARS = 'ADD_BARS';
export const ADD_BAR = 'ADD_BAR';
export const REMOVE_BAR = 'REMOVE_BAR';

fetch('/test/test')
    .then((data) => {
        //console.log('test/test', data);
    })
    .catch((err) => {
        console.log(err);
    });

// set user search term to store
export const searchTerm = (term) => {
    return {
        type: REQUEST_RESULT,
        term
    };
};

export const addBars = (bars) => {
    return {
        type: ADD_BARS,
        bars
    };
}

// returns yelp api result
export const getSearchResult = (loc) => {
    return dispatch => {
        dispatch(searchTerm(loc));
        return fetch('https://night-life-rhgksrua-1.c9users.io/test/test')
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                // data.businesses is an array.
                dispatch(addBars(data.businesses));
                console.log('fetch data', data);
                return data;
            });
    };
};

// returns list of bars user is attending
export const getUserBarList = (list) => {
    return {
        
    };
};

// change status to "going" in search result and user list
export const addBar = (bar) => {
    return {
        
    };
    
};


// change status to "not going" in search result and user list
export const removeBar = (bar) => {
    return {
        
    };
    
};

