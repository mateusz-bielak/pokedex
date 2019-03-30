import React from 'react';
import PropTypes from 'prop-types';

import pokeball from './assets/pokeball.svg';

export const PokemonListItem = props => (
    <div
        style={{
            backgroundColor: '#ED5564',
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
            src={pokeball}
            style={{ height: '80px', position: 'absolute', top: '-3px', left: '-40px' }}
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
        {/* <img
            style={{ height: '100px', width: '100px' }}
            src={`https://pokeres.bastionbot.org/images/pokemon/${props.pokemon.id}.png`}
            alt="pokemon"
        /> */}
    </div>
);

PokemonListItem.propTypes = {
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
};
