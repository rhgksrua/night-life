import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo, getSearchResult, logOutAJAX } from './actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        this.props.initialize(this.props.location.query.term);
    }
    getRedirectPath() {
        let path = this.props.location.pathname;
        return path.replace(/\//, '');
    }
    render() {
        let redirect = `?redirect=${encodeURIComponent(this.getRedirectPath())}`;
        let term = this.props.barsList.term ? `&term=${encodeURIComponent(this.props.barsList.term)}` : '';
        let query = redirect + term;
        return (
            <div className='app-container'>
                <nav>
                    <ul>
                        <li><Link to='/' activeClassName='active' onlyActiveOnIndex={true}>HOME</Link></li>
                        <li><Link to='/me' activeClassName='active'>ME</Link></li>
                    </ul>
                    {this.props.userInfo.username === undefined &&
                        <a href={`/auth/github/${query}`}>Sign In</a>
                    }
                    {this.props.userInfo.username &&
                        <a href='#' onClick={this.props.logOut}>Log Out</a>
                    }
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

function mapDispatchToProps(dispatch, ownProps) {
    return {
        logOut: (e) => {
            e.preventDefault();
            dispatch(logOutAJAX());
        },
        initialize: (term) => {
            dispatch(getUserInfo());
            console.log('---ownprops', ownProps);
            if (term) {
                dispatch(getSearchResult(term));
            }
        }
    };
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);