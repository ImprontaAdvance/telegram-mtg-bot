import React, {Component} from 'react';

export default class Responsetable extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };

    render() {

        if (this.props.cercato === false)
            return false;


        return (
            <div className="resoults-container">
                <div className="row">
                    <div className="grid-cell">
                        Titolo della carta
                    </div>
                    <div className="grid-cell">
                        Prezzo minimo
                    </div>
                    <div className="grid-cell">
                        Prezzo medio
                    </div>
                </div>
                <div className="row">
                    <div className="grid-cell">
                        {this.props.cards[0].nome}
                    </div>
                    <div className="grid-cell">
                        {this.props.cards[0].prezzoMinimo}
                    </div>
                    <div className="grid-cell">
                        {this.props.cards[0].prezzoMedio}
                    </div>
                </div>
            </div>
        );
    };
};
