import React from 'react';
import { connect } from 'react-redux';
import BarsList from '../bars/BarsList';
import { getSearchResult, addBar, removeBar } from '../actions/actions';

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
    const { barsList, myList } = state;
    console.log('mapstate state', state);
    return {
        barsList,
        myList 
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addBarToMe: bar => {
            console.log('addBarToMe', bar);
            dispatch(addBar(bar));
        },
        removeBarFromMe: (bar, myList) => {
            console.log('removing bar from me', bar);
            dispatch(removeBar(bar));
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarsList);


