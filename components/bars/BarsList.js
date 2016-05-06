import React from 'react';

class BarsList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAddBarToMe(bar) {
        // bar exists in myList, removes bar instead.
        if (!this.props.userInfo.username) {
            return;
        }
        if (this.props.myList.some(myBar => {
            return bar.id === myBar.id;
        })) {
            return this.props.removeBarFromMe(bar.id, this.props.myList); //this.props.addBarToMe(bar);
        }
        return this.props.addBarToMe(bar);
    }
    render() {
        let bars = <li>No Results</li>;
        let barsList = this.props.barsList;
        if (barsList.bars && barsList.bars.length > 0) {
            bars = barsList.bars.map((bar, i) => {
                //console.log(bar);
                let goingNumber = (bar.goingNumber && bar.goingNumber > 0) ? bar.goingNumber : undefined;
                //console.log('--bar going', bar.userGoing);
                return (
                    <li className={bar.userGoing === true ? 'bar going' : 'bar'} key={bar.id}>
                        <p className='bar-image'><img src={bar.image_url}/></p>
                        <div className='bar-info'>
                            
                            <h3><a href={bar.url}>{bar.name}</a><span className={this.props.userInfo.username ? 'going-status' : 'going-status hide'} onClick={this.handleAddBarToMe.bind(this, bar)}>{bar.userGoing === true ? 'Going' : 'GO!'}</span></h3>
                            {goingNumber &&
                            <p>Attending: {goingNumber}</p>
                            }
                            <p className='snippet'>{bar.snippet_text}</p>
                            <p>Review Count: {bar.review_count}</p>
                            <img src={bar.rating_img_url} />
                        </div>
                    </li>
                );
            });
            //console.log('total bars', bars);
        } 
        if (this.props.barsList.isFetching) {
            bars = <li>Fetching...</li>
        }
        return (
            <div>
                <ul className='bars-list'>
                    {bars}
                </ul>
            </div>
        );
    }
}

export default BarsList;