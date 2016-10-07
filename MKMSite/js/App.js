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
        // fetch('http://jsfiddle.net/echo/json/', {
        //     method: 'GET',
        //     // body: JSON.stringify({
        //     //     string: string
        //     // })
        // })
        // .then(response => {
        //     console.log('hello');
        //     //return { cards: [0, 1, 2]};
        //     //response.json()
        // })
        // .catch((e) => console.log(e));
        // .then(data => {
        //     this.setState({cards: data.cards});
        // });
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
