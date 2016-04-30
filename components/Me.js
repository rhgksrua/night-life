import React from 'react';

class Me extends React.Component {
    render() {
        const myList = this.props.myList;
        let myBarsList;
        if (myList && myList.length > 0) {
            myBarsList = myList.map((bar, i) => {
                return (
                    <li key={i}>
                        <p>{bar.name}</p>
                        <button onClick={this.props.removeBarFromMe.bind(this, bar.id)}>remove</button>
                    </li>
                );
            });
        }
        return (
            <div className='me-container'>
                <p>Lists all the bars you are attending</p>
                {myBarsList}
            </div>
        );
    }
}

export default Me;
