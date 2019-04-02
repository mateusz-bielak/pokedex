import React from 'react';
import PropTypes from 'prop-types';

import pokeball from './assets/pokeball.svg';
import pokeballGray from './assets/pokeball-gray.svg';

export const PokemonListItem = props => (
    <div
        style={{
            backgroundColor: props.caught ? '#ED5564' : '#7A777E',
            color: '#F5F7FA',
            marginLeft: '20px',
            position: 'relative',
            height: '55px',
            margin: '40px 0',
            fontWeight: 600,
            fontSize: '28px',
            border: '3px solid #434A54',
            borderTopRightRadius: '30px',
            borderBottomRightRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'capitalize',
        }}
    >
        <img
            src={props.caught ? pokeball : pokeballGray}
            style={{ height: '80px', position: 'absolute', top: '-3px', left: '-40px' }}
            className="slideRight"
            alt="what"
        />
        <span>{props.pokemon.name}</span>
        <span
            style={{
                fontSize: '36px',
                position: 'absolute',
                right: '25px',
                fontStyle: 'italic',
            }}
        >
            #{props.pokemon.id}
        </span>
    </div>
);
PokemonListItem.propTypes = {
    caught: PropTypes.bool.isRequired,
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
};
