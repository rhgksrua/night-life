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
            return this.props.removeBarFromMe(bar, this.props.myList); //this.props.addBarToMe(bar);
        }
        return this.props.addBarToMe(bar);
    }
    render() {
        let bars = <li>No Results</li>;
        let barsList = this.props.barsList;
        let myList = this.props.myList;
        if (barsList.bars && barsList.bars.length > 0) {
            bars = barsList.bars.map((bar, i) => {
                //return <li key={bar.id} onClick={this.props.addBarToMe.bind(this, bar)}>{bar.name}</li>
                return <li key={bar.id} onClick={this.handleAddBarToMe.bind(this, bar)}>{bar.name}</li>
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