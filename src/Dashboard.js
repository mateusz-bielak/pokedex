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
    constructor(props) {
        super(props);

        this.state = {
            id: null,
        };

        this.selectPokemon = this.selectPokemon.bind(this);
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(res => res.json())
            .then(({ results }) => {
                Promise.all(results.map(({ url }) => fetch(url).then(res => res.json()))).then(
                    pokemons => this.setState({ pokemons }),
                );
            });
    }

    selectPokemon(id) {
        this.setState({ id });
    }

    render() {
        return this.state.pokemons ? (
            <Container>
                <Wrapper>
                    {this.state.pokemons.map(pokemon => (
                        <PokemonListItem
                            key={pokemon.id}
                            pokemon={pokemon}
                            caught={pokemon.id === this.state.id}
                            selectPokemon={this.selectPokemon}
                        />
                    ))}
                </Wrapper>
                {this.state.id && <PokemonCard pokemonId={this.state.id} />}
            </Container>
        ) : (
            <p>Loading</p>
        );
    }
}
