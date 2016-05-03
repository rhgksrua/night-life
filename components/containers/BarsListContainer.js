import React from 'react';
import { connect } from 'react-redux';
import BarsList from '../bars/BarsList';
import { getSearchResult, addBarAJAX, removeBarAJAX } from '../actions/actions';

class BarsListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        /*
        this.props.dispatch(getSearchResult('new york'))
            .then(() => {
                console.log('store getstate', this.props.store);
            });
        */
    }
    
    /*
    addBarToMe(id) {
        const { dispatch } = this.props;
        dispatch(addBar(id));
    }
    */
    
    /*
    render() {
        const { barsList, myList } = this.props;
        return (
            <BarsList term={barsList.term} 
                      bars={barsList.bars} 
                      isFetching={barsList.isFetching} 
            />
        );
    }
    */
}

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


