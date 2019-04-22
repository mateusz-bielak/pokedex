import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { PokemonCard } from './PokemonCard';
import { breakpoints, colors, fontSizes } from './variables';
import pokeball from './assets/pokeball.svg';
import pokeballGray from './assets/pokeball-gray.svg';

const { pokeballMain, pokeballSecondary, pokeballBorder, missingPokemon } = colors;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;
    margin: 10px 0;
    padding: 0 10px 0 30px;
    border: 2px solid ${pokeballBorder};
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;

    font-weight: 600;
    font-size: ${fontSizes.medium};
    text-transform: capitalize;

    background-color: ${props => (props.selectedPokemonId ? pokeballMain : missingPokemon)};
    color: ${pokeballSecondary};

    ${breakpoints.large} {
        height: 55px;
        margin: 0 0 40px 0;
        font-size: ${fontSizes.large};
    }
`;

const PokeballIcon = styled.img`
    height: 50px;
    position: absolute;
    top: -3px;
    left: -26px;

    ${breakpoints.large} {
        height: 80px;
        left: -40px;
    }
`;

const PokemonName = styled.span`
    flex-grow: 1;
    text-align: center;
`;

const PokemonHash = styled.span`
    font-size: ${fontSizes.large};
    font-style: italic;

    ${breakpoints.large} {
        right: 25px;
        font-size: ${fontSizes.extraLarge};
    }
`;

export const PokemonListItem = ({ selectedPokemonId, pokemon, selectPokemon }) => (
    <>
        <Wrapper selectedPokemonId={selectedPokemonId} onClick={() => selectPokemon(pokemon.id)}>
            <PokeballIcon
                src={selectedPokemonId ? pokeball : pokeballGray}
                className="slideRight"
                alt="pokeball.svg"
            />
            <PokemonName>{pokemon.name}</PokemonName>
            <PokemonHash hey="heyho">#{pokemon.id}</PokemonHash>
        </Wrapper>
        {selectedPokemonId && <PokemonCard pokemonId={pokemon.id} />}
    </>
);

PokemonListItem.propTypes = {
    selectedPokemonId: PropTypes.bool.isRequired,
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
    selectPokemon: PropTypes.func.isRequired,
};
