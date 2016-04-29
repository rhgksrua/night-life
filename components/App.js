import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo } from './actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log('app mount');
        console.log('query', this.props.location.query);
    }
    componentDidMount() {
        console.log('did mount get username');
        const { dispatch } = this.props;
        dispatch(getUserInfo());
    }
    render() {
        return (
            <div className='app-container'>
                <nav>
                    <ul>
                        <li><Link to='/' activeClassName='active' onlyActiveOnIndex={true}>HOME</Link></li>
                        <li><Link to='/me' activeClassName='active'>ME</Link></li>
                    </ul>
                    <button>Sign In</button>
                    <button>Log Out</button>
                    <a href='/auth/github'>login from react</a>
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