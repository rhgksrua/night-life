import React from 'react';
import { connect } from 'react-redux';
import Me from '../Me';
import { removeBar } from '../actions/actions';

function mapStateToProps(state) {
    const { myList } = state;
    return {
        myList
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        removeBarFromMe: id => {
            console.log('remove id', id);
            dispatch(removeBar(id));
        }
    };
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);