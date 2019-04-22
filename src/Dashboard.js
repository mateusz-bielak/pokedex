import React, { Component } from 'react';
import styled from '@emotion/styled';

import { PokemonListItem } from './PokemonListItem';
import { breakpoints } from './variables';

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    position: relative;
    overflow: hidden;
    max-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Wrapper = styled.div`
    box-sizing: border-box;
    overflow-y: scroll;
    width: 100%;
    padding: 10px 20px 10px 38px;

    ${breakpoints.large} {
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
                            selectedPokemonId={pokemon.id === this.state.selectedPokemonId}
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
