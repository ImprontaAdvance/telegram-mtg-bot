import React, {Component} from 'react';

export default class Requestform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ricerca: false,
            cards: ''
        };
    };

    onChangeCards(e) {
        this.setState(
            {
                cards: e.target.value,
            }
        );
    };

    onSubmit(e) {
        // e.preventDefault();
        var stringa = this.state.cards;
        this.props.onSearch(stringa);

        if (stringa) {
            this.setState(
                {
                    ricerca: true,
                }
            );
        } else {
            this.setState(
                {
                    ricerca: false,
                }
            );
        };
    };

    render() {

        return (
            <div className="search-box">
                <h3>Di quali carte vuoi sapere i prezzi?</h3>
                <p>Puoi cercare più di una carta, separa i nomi con una virgola.</p>
                <input type="text" value={this.state.cards} placeholder="" onChange={(e) => this.onChangeCards(e)}></input>
                <button type="submit" onClick={(e) => this.onSubmit(e)}>Cerca i prezzi</button>
                <p className={'stringa-cercata ' + (this.state.ricerca ? 'visible' : '')}>Ultima ricerca: {this.props.lastSearch}</p>
            </div>
        );
    };
};
