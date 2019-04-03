import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import pokeball from './assets/pokeball.svg';
import pokeballGray from './assets/pokeball-gray.svg';

const Wrapper = styled.div`
    background-color: ${props => (props.caught ? '#ED5564' : '#7A777E')};
    color: #f5f7fa;
    margin-left: 20px;
    position: relative;
    height: 55px;
    margin: 40px 0;
    font-weight: 600;
    font-size: 28px;
    border: 3px solid #434a54;
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
        <PokeballIcon src={caught ? pokeball : pokeballGray} className="slideRight" alt="what" />
        <span>{pokemon.name}</span>
        <PokemonHash>#{pokemon.id}</PokemonHash>
    </Wrapper>
);
PokemonListItem.propTypes = {
    caught: PropTypes.bool.isRequired,
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
};
