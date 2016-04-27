'use strict';

// actions

import fetch from 'isomorphic-fetch';
import Yelp from 'yelp';

const SEARCH_TERM = 'bar';

const REQUEST_RESULT = 'REQUEST_RESULT';

fetch('/test/test')
    .then((data) => {
        console.log(data);
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

// returns yelp api result
export const getSearchResult = (loc) => {
    return dispatch => {
        dispatch(searchTerm(loc));
        return fetch('https://night-life-rhgksrua-1.c9users.io/test/test')
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log('fetch data', data);
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

