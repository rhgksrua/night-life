import React from 'react';
import { connect } from 'react-redux';
import BarsList from '../bars/BarsList';
import { getSearchResult, addBarAJAX, removeBarAJAX } from '../actions/actions';

function mapStateToProps(state) {
    const { barsList, myList, userInfo } = state;
    //console.log('mapstate state', state);
    return {
        barsList,
        myList,
        userInfo
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addBarToMe: bar => {
            console.log('addBarToMe', bar);
            dispatch(addBarAJAX(bar));
        },
        removeBarFromMe: (barId, myList) => {
            console.log('removing bar from me', barId);
            dispatch(removeBarAJAX(barId));
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarsList);


