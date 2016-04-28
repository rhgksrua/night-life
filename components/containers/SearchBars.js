import React from 'react';
import { connect } from 'react-redux';
import { getSearchResult } from '../actions/actions';

let SearchBars = ({ dispatch }) => {
    let input;
    
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                dispatch(getSearchResult(input.value));
                
            }}>
                <input ref={node => {
                    input = node
                }} />
                <button type='submit'>
                    Search
                </button>
            </form>
        </div>
    );
}

SearchBars = connect()(SearchBars);

export default SearchBars;