import React from 'react';
import PropTypes from 'prop-types';

export const PokemonListItem = props => (
    <p>
        {props.pokemon.id}. {props.pokemon.name}
        <img
            style={{ height: '100px', width: '100px' }}
            src={`https://pokeres.bastionbot.org/images/pokemon/${props.pokemon.id}.png`}
            alt="pokemon"
        />
    </p>
);

PokemonListItem.propTypes = {
    pokemon: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }).isRequired,
};
