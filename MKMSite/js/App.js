import React, {Component} from 'react';
import Requestform from './Requestform';
import Responsetable from './Responsetable';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cercato: false,
            lastSearch: '',
            cards: []
        };
    }

    onSearch(string) {
        this.setState({cards: [
            {
                nome: 'carta1',
                prezzoMinimo: '€13.00',
                prezzoMedio: '€ 18.00'
            }
        ]});
        fetch('http://localhost:3001/?q=' + string)
        .then(response => {
            console.log('hello');
            //return { cards: [0, 1, 2]};
            return response.json();
        })
        .catch((e) => console.log(e))
        .then(data => {
            this.setState({cards: data});
        });
        //
        // return;
        //
        if(string) {
            this.setState({
                cercato: true,
                lastSearch: string,
            });
        } else {
            this.setState(
                {
                    cercato: false,
                }
            );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>BOT di ricerca prezzi</h1>
                    <span></span>
                </div>
                <Requestform
                    onSearch={(stringa) => this.onSearch(stringa)}
                    lastSearch={this.state.lastSearch} />
                <Responsetable
                    cercato={this.state.cercato}
                    cards={this.state.cards} />
            </div>
        );
    }
};
