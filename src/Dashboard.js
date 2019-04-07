import React, { Component } from 'react';
import styled from '@emotion/styled';

import { PokemonCard } from './PokemonCard';
import { PokemonListItem } from './PokemonListItem';

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    max-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    width: 40%;
    padding: 0 20px 0 38px;
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
            <Container>
                <Wrapper>
                    {this.state.pokemons.map(pokemon => (
                        <PokemonListItem
                            key={pokemon.id}
                            pokemon={pokemon}
                            caught={pokemon.id === 1}
                        />
                    ))}
                </Wrapper>
                <PokemonCard pokemonId="1" />
            </Container>
        ) : (
            <p>Loading</p>
        );
    }
}
