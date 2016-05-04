import React from 'react';

class BarsList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAddBarToMe(bar) {
        // bar exists in myList, removes bar instead.
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
                return (
                    <li key={bar.id} onClick={this.handleAddBarToMe.bind(this, bar)}>
                        <p>{bar.name}</p>
                        {goingNumber &&
                        <p>{goingNumber}</p>
                        }
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
                {barsList.term &&
                    <h1>{barsList.term}</h1>
                }
                <ul>
                    {bars}
                </ul>
            </div>
        );
    }
}

export default BarsList;