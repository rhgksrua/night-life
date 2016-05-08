import React from 'react';
import { connect } from 'react-redux';
import BarsList from '../bars/BarsList';
import { addBarAJAX, removeBarAJAX } from '../actions/actions';

function mapStateToProps(state) {
    const { barsList, myList, userInfo } = state;
    return {
        barsList,
        myList,
        userInfo
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addBarToMe: bar => {
            dispatch(addBarAJAX(bar));
        },
        removeBarFromMe: (barId, myList) => {
            dispatch(removeBarAJAX(barId));
        }
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarsList);


