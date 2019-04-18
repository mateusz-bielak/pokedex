import React, { Component } from 'react';
import styled from '@emotion/styled';

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
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 0 20px 0 38px;

    @media (min-width: 940px) {
        width: 40%;
    }
`;

export class Dashboard extends Component {
    state = {
        selectedPokemonId: 1,
    };

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(res => res.json())
            .then(({ results }) => {
                Promise.all(results.map(({ url }) => fetch(url).then(res => res.json()))).then(
                    pokemons => this.setState({ pokemons }),
                );
            });
    }

    selectPokemon = selectedPokemonId => {
        this.setState({ selectedPokemonId });
    };

    render() {
        return this.state.pokemons ? (
            <Container>
                <Wrapper>
                    {this.state.pokemons.map(pokemon => (
                        <PokemonListItem
                            key={pokemon.id}
                            pokemon={pokemon}
                            selected={pokemon.id === this.state.selectedPokemonId}
                            selectPokemon={this.selectPokemon}
                        />
                    ))}
                </Wrapper>
            </Container>
        ) : (
            <p>Loading</p>
        );
    }
}
