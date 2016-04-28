import React from 'react';
import { connect } from 'react-redux';
import BarsList from '../bars/BarsList';
import { getSearchResult } from '../actions/actions';

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
    
    render() {
        const { barsList, myList } = this.props;
        return (
            <BarsList term={barsList.term} bars={barsList.bars}/>
        );
    }
}

function mapStateToProps(state) {
    const { barsList, myList } = state;
    console.log('mapstate state', state);
    return {
        barsList,
        myList 
    };
}

export default connect(mapStateToProps)(BarsListContainer);


