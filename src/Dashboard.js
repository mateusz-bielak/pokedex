import React, { Component } from 'react';

export class Dashboard extends Component {
    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(res => res.json())
            .then(({ results }) => {
                Promise.all(results.map(({ url }) => fetch(url).then(res => res.json()))).then(
                    pokemons => this.setState({ pokemons }),
                );
            });
    }

    render() {
        return this.state ? (
            <>
                {this.state.pokemons.map((pokemon, index) => (
                    <p key={pokemon.name}>
                        {index + 1}. {pokemon.name}
                        <img
                            style={{ height: '100px', width: '100px' }}
                            src={`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`}
                            alt="pokemon"
                        />
                    </p>
                ))}
            </>
        ) : (
            <p>Loading</p>
        );
    }
}
