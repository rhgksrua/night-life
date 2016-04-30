import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo, searchTerm, getSearchResult } from './actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // uses query to keep previous search term
        console.log('query', this.props.location.query);
        const { dispatch } = this.props;
        dispatch(getUserInfo());
        if (this.props.location.query.term) {
            // maybe create prevSearchTerm
            dispatch(getSearchResult(this.props.location.query.term));
        }
    }
    componentDidMount() {
        console.log('did mount get username');
    }
    render() {
        let term = this.props.barsList.term ? `?term=${this.props.barsList.term}` : '';
        return (
            <div className='app-container'>
                <nav>
                    <ul>
                        <li><Link to='/' activeClassName='active' onlyActiveOnIndex={true}>HOME</Link></li>
                        <li><Link to='/me' activeClassName='active'>ME</Link></li>
                    </ul>
                    <button>Sign In</button>
                    <button>Log Out</button>
                    <a href={`/auth/github/${term}`}>login from react</a>
                    {this.props.userInfo.username &&
                    <p>{this.props.userInfo.username}</p>
                    }
                </nav>
                {this.props.children}
            </div>
        
        );
    }
}

function mapStateToProps(state) {
    const { barsList, myList, userInfo } = state;
    return {
        barsList,
        myList,
        userInfo
    };
}

export default connect(mapStateToProps)(App);