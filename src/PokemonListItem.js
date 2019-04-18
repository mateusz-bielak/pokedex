import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { PokemonCard } from './PokemonCard';
import { colors, fontSizes } from './variables';
import pokeball from './assets/pokeball.svg';
import pokeballGray from './assets/pokeball-gray.svg';

const { pokeballMain, pokeballSecondary, pokeballBorder, missingPokemon } = colors;

const Wrapper = styled.div`
    background-color: ${props => (props.caught ? pokeballMain : missingPokemon)};
    color: ${pokeballSecondary};
    position: relative;
    height: 55px;
    margin-bottom: 40px;
    font-weight: 600;
    font-size: ${fontSizes.large};
    border: 3px solid ${pokeballBorder};
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
    font-size: ${fontSizes.extraLarge};
    position: absolute;
    right: 25px;
    font-style: italic;
`;

export const PokemonListItem = ({ selected, pokemon, selectPokemon }) => (
    <>
        <Wrapper selected={selected} onClick={() => selectPokemon(pokemon.id)}>
            <PokeballIcon
                src={selected ? pokeball : pokeballGray}
                className="slideRight"
                alt="pokeball.svg"
            />
            <span>{pokemon.name}</span>
            <PokemonHash hey="heyho">#{pokemon.id}</PokemonHash>
        </Wrapper>
        {selected && <PokemonCard pokemonId={pokemon.id} />}
    </>
);

PokemonListItem.propTypes = {
    selected: PropTypes.bool.isRequired,
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
    selectPokemon: PropTypes.func.isRequired,
};
