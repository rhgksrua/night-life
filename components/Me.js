import React from 'react';

class Me extends React.Component {
    render() {
        const myList = this.props.myList;
        let myBarsList = <li>Staying home...</li>
        if (myList && myList.length > 0) {
            myBarsList = myList.map((bar, i) => {
                return (
                    <li className='bar' key={bar.id}>
                        <p className='bar-image'><img src={bar.image_url}/></p>
                        <div className='bar-info'>
                            <h3><a href={bar.url}>{bar.name}</a></h3>
                            <p>{bar.snippet_text}</p>
                            <p>Review Count: {bar.review_count}</p>
                            <img src={bar.rating_img_url} />
                        </div>
                        <button onClick={this.props.removeBarFromMe.bind(this, bar.id)}>Not Going</button>
                    </li>
                );
            });
        }
        return (
            <div className='me-container'>
                <ul className='bars-list'>
                    {myBarsList}
                </ul>
            </div>
        );
    }
}

export default Me;
