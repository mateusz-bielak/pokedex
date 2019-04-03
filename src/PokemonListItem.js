import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from './variables';
import pokeball from './assets/pokeball.svg';
import pokeballGray from './assets/pokeball-gray.svg';

const {
    pokeballMainColor,
    pokeballSecondaryColor,
    pokeballBorderColor,
    missingPokemonColor,
} = colors;

const Wrapper = styled.div`
    background-color: ${props => (props.caught ? pokeballMainColor : missingPokemonColor)};
    color: ${pokeballSecondaryColor};
    margin-left: 20px;
    position: relative;
    height: 55px;
    margin: 40px 0;
    font-weight: 600;
    font-size: 28px;
    border: 3px solid ${pokeballBorderColor};
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
`;

const PokeballIcon = styled.img`
    height: 80px;
    position: absolute;
    top: -3px;
    left: -40px;
`;

const PokemonHash = styled.span`
    font-size: 36px;
    position: absolute;
    right: 25px;
    font-style: italic;
`;

export const PokemonListItem = ({ caught, pokemon }) => (
    <Wrapper caught={caught}>
        <PokeballIcon
            src={caught ? pokeball : pokeballGray}
            className="slideRight"
            alt="pokeball.svg"
        />
        <span>{pokemon.name}</span>
        <PokemonHash>#{pokemon.id}</PokemonHash>
    </Wrapper>
);

PokemonListItem.propTypes = {
    caught: PropTypes.bool.isRequired,
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
};
