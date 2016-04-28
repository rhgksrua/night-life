import React from 'react';
import BarsListContainer from './containers/BarsListContainer';
import SearchBars from './containers/SearchBars';

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h1>Night Life</h1>
                <SearchBars />
                <BarsListContainer />
            </div>
        );
    }
}

export default Home;