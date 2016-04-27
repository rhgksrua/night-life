import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class App extends React.Component {
    componentWillMount() {
        console.log('app mount');
        console.log('query', this.props.location.query);
        /*
        $.get('test/test', data => {
            console.log('data', data);
        });
        */
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
                </nav>
                {this.props.children}
            </div>
        
        );
    }
}

export default App;