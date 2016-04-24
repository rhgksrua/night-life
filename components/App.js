import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div className='app-container'>
                <nav>
                    <ul>
                        <li><Link to='/' activeClassName='active' onlyActiveOnIndex={true}>HOME</Link></li>
                        <li><Link to='/me' activeClassName='active'>ME</Link></li>
                    </ul>
                </nav>
                {this.props.children}
            </div>
        
        );
    }
}

export default App;