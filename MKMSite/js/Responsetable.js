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
                        {this.props.cards[0].name}
                    </div>
                    <div className="grid-cell">
                        {this.props.cards[0].price}
                    </div>
                    <div className="grid-cell">
                    </div>
                </div>
            </div>
        );
    };
};
