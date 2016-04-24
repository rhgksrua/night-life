import React from 'react';
import BarsList from './bars/BarsList';

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h1>Night Life</h1>
                <BarsList />
            </div>
        );
    }
}

export default Home;