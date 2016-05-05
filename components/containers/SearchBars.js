import React from 'react';
import { connect } from 'react-redux';
import { getSearchResult } from '../actions/actions';

class SearchBars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    handleChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(getSearchResult(this.state.text));
    }
    componentDidMount() {
        const term = this.props.barsList.term;
        if (term) {
            this.setState({text: term});
        }
    }
    render() {
        //let input;
        //const { barsList, dispatch } = this.props.barsList;
        //console.log('barslist in SEARch', barsList.term);
        
        return (
            <div className='search-container'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input 
                        value={this.state.text}
                        onChange={this.handleChange.bind(this)}
                    />
                    <button type='submit'>Search</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { barsList } = state;
    return {
        barsList
    };
}

SearchBars = connect(mapStateToProps)(SearchBars);

export default SearchBars;