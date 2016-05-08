import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo, getSearchResult, logOutAJAX } from './actions/actions';

class App extends React.Component {
    constructor(props, context) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    componentWillMount() {
        this.props.initialize(this.props.location.query.term);
    }
    getRedirectPath() {
        let path = this.props.location.pathname;
        return path.replace(/\//, '');
    }
    logOut() {
        this.props.logOut(this.context.router.push);
    }
    render() {
        let redirect = `?redirect=${encodeURIComponent(this.getRedirectPath())}`;
        let term = this.props.barsList.term ? `&term=${encodeURIComponent(this.props.barsList.term)}` : '';
        let query = redirect + term;
        return (
            <div className='app-container'>
                <nav>
                    <h1>Night Life</h1>
                    <ul>
                        <li className='tab home'><Link to='/' activeClassName='active' onlyActiveOnIndex={true}>HOME</Link></li>
                        <li className='tab me'><Link to='/me' activeClassName='active'>{this.props.userInfo.username ? this.props.userInfo.username : ''}</Link></li>
                        {this.props.userInfo.username === undefined &&
                            <li className='login'>
                                <a href={`/auth/github/${query}`}>
                                    <img className='login-img' src='/GitHub-Mark-32px.png' />
                                </a>
                            </li>
                        }
                        {this.props.userInfo.username &&
                            <li><a href='#' onClick={this.logOut}>Log Out</a></li>
                        }
                    </ul>
                </nav>
                {this.props.children}
                <footer>
                    <p>By rhgksrua</p>
                </footer>
            </div>
        
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

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
        logOut: (push) => {
            dispatch(logOutAJAX());
            push('/');
        },
        initialize: (term) => {
            dispatch(getUserInfo());
            if (term) {
                dispatch(getSearchResult(term));
            }
        }
    };
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);