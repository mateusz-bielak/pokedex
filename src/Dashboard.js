import React, { Component } from 'react';
import styled from '@emotion/styled';

import { PokemonListItem } from './PokemonListItem';

const Wrapper = styled.div`
    padding: 40px;
`;

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
            <Wrapper>
                {this.state.pokemons.map(pokemon => (
                    <PokemonListItem key={pokemon.id} pokemon={pokemon} caught={pokemon.id === 1} />
                ))}
            </Wrapper>
        ) : (
            <p>Loading</p>
        );
    }
}
