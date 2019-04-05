import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from './variables';

const Wrapper = styled.div`
    width: 60%;
    border: 3px solid ${colors.pokeballBorder};
`;

const Image = styled.img`
    max-width: 100%;
`;

export class PokemonCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: undefined,
        };
    }

    componentDidMount() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonId}`)
            .then(res => res.json())
            .then(pokemon => this.setState({ pokemon }));
    }

    render() {
        return (
            <Wrapper>
                <span>{this.state.pokemon && this.state.pokemon.name}</span>
                <Image
                    src={`https://pokeres.bastionbot.org/images/pokemon/${
                        this.props.pokemonId
                    }.png`}
                    alt="poke"
                />
            </Wrapper>
        );
    }
}

PokemonCard.propTypes = {
    pokemonId: PropTypes.string.isRequired,
};
