import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from './variables';

const Wrapper = styled.div`
    width: 60%;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
`;

const NameCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 50px;
    width: 100%;
    margin-right: 20px;

    border-radius: 20px;
    background-color: ${colors.pokeballSecondary};
`;

const Name = styled.span`
    display: block;

    font-weight: bold;
    text-transform: capitalize;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    max-height: 200px;
    max-width: 200px;
`;

export class PokemonCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: undefined,
            pokemonSpecies: undefined,
        };
    }

    componentDidMount() {
        this.fetchPokemonData();
    }

    componentDidUpdate() {
        this.fetchPokemonData();
    }

    fetchPokemonData() {
        const requests = Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonId}`).then(res =>
                res.json(),
            ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.props.pokemonId}`).then(res =>
                res.json(),
            ),
        ]);

        requests.then(([pokemon, pokemonSpecies]) => this.setState({ pokemon, pokemonSpecies }));
    }

    render() {
        return (
            <Wrapper>
                <Header>
                    <NameCard>
                        <Name>{this.state.pokemon && this.state.pokemon.name}</Name>
                        <span>
                            {this.state.pokemonSpecies && this.state.pokemonSpecies.genera[2].genus}
                        </span>
                    </NameCard>
                    <Image
                        src={`https://pokeres.bastionbot.org/images/pokemon/${
                            this.props.pokemonId
                        }.png`}
                        alt="poke"
                    />
                </Header>
            </Wrapper>
        );
    }
}

PokemonCard.propTypes = {
    pokemonId: PropTypes.number.isRequired,
};
