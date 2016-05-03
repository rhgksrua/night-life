'use strict';

// actions

import fetch from 'isomorphic-fetch';

export const YELP_SEARCH_TERM = 'bar';

export const SEARCH_TERM = 'SEARCH_TERM';
export const ADD_BARS = 'ADD_BARS';
export const ADD_BAR = 'ADD_BAR';
export const REMOVE_BAR = 'REMOVE_BAR';
export const ADD_USERNAME = 'ADD_USERNAME';
export const SET_USER_BAR_LIST = 'SET_USER_BAR_LIST';


// set user search term to store
export const searchTerm = (term) => {
    return {
        type: SEARCH_TERM,
        term
    };
};

export const addBars = (bars) => {
    return {
        type: ADD_BARS,
        bars
    };
}

export const addUsername = username => {
    return {
        type: ADD_USERNAME,
        username
    }
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
                    throw new Error(data.error);
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
                    credentials: 'same-origin',
                    method: 'post'
                }
            )
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                // dispatch here to set the username
                if (data.error) {
                    return data;
                }
                dispatch(addUsername(data.username));
                if (data.data) {
                    dispatch(setUserBarList(data.data));
                }
                return data;
                
            })
            .catch((err) => {
                console.warn(err);
            })
    }
};

// returns list of bars user is attending
export const setUserBarList = (list) => {
    return {
        type: SET_USER_BAR_LIST,
        list
    };
};

// change status to "going" in search result and user list
export const addBar = (bar) => {
    return {
        type: ADD_BAR,
        bar
    };
};

export const addBarAJAX = (bar) => {
    return dispatch => {
        return fetch(
                // requests server to verify user based on cookie
                `${window.location.protocol}//${window.location.host}/addbar`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bar }),
                    credentials: 'same-origin',
                    method: 'post'
                }
                
            )
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.error) {
                    return data;
                }
                dispatch(addBar(bar));
                return data;
            })
            .catch((err) => {
                //dispatch(addBar(bar));
                console.warn(err);
            })
    };
}

export const removeBarAJAX = (barId) => {
    return dispatch => {
        return fetch(
                `${window.location.protocol}//${window.location.host}/removebar`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ barId }),
                    credentials: 'same-origin',
                    method: 'post'
                }
            )
            .then((data) => {
                return data.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                    //return data;
                }
                dispatch(removeBar(barId));
                return data;
            })
            .catch((err) => {
                console.warn(err);
            });
    }
}


// change status to "not going" in search result and user list
export const removeBar = (barId) => {
    return {
        type: REMOVE_BAR,
        barId
    };
    
};

