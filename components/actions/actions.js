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
        return fetch(
                `${window.location.protocol}//${window.location.host}/test/test`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'post',
                    body: JSON.stringify({loc: loc})
                }
            )
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log('check error', data);
                if (data.error) {
                    dispatch(addBars([]));
                    return data;
                }
                // data.businesses is an array.
                dispatch(addBars(data.businesses));
                //console.log('fetch data', data);
                return data;
            }).catch((err) => {
                console.warn(err);
            })
    };
};

export const getUserInfo = () => {
    return dispatch => {
        return fetch(
                // requests server to verify user based on cookie
                `${window.location.protocol}//${window.location.host}/userinfo`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'post'
                }
            )
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                // dispatch here to set the username
                
            })
            .catch((err) => {
                console.warn(err);
            })
    }
};

// returns list of bars user is attending
export const getUserBarList = (list) => {
    return {
        
    };
};

// change status to "going" in search result and user list
export const addBar = (barId) => {
    return {
        type: ADD_BAR,
        barId
    };
    
};


// change status to "not going" in search result and user list
export const removeBar = (barId) => {
    return {
        type: REMOVE_BAR,
        barId
        
    };
    
};

