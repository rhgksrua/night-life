import React from 'react';

class BarsList extends React.Component {
    render() {
        let bars;
        //console.log('from cont', this.props);
        if (this.props.bars && this.props.bars.length > 0) {
            bars = this.props.bars.map((bar, i) => {
                return <li key={i}>{bar.name}</li>
            });
            console.log('total bars', bars);
        }
        return (
            <div>
                {this.props.term &&
                    <h1>{this.props.term}</h1>
                }
                <ul>
                    {bars}
                </ul>
            </div>
        );
    }
}

export default BarsList;