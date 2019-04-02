import React, { Component } from 'react';
import { PokemonListItem } from './PokemonListItem';

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
            <div style={{ padding: '40px' }}>
                {this.state.pokemons.map(pokemon => (
                    <PokemonListItem key={pokemon.id} pokemon={pokemon} caught={pokemon.id === 1} />
                ))}
            </div>
        ) : (
            <p>Loading</p>
        );
    }
}
