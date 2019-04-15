import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { CardHeader } from './CardHeader';
import { CardWrapper } from './CardWrapper';
import { api } from './variables';

const Wrapper = styled.div`
    width: 60%;
`;

export class PokemonCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            blur: false,
            pokemon: undefined,
            pokemonSpecies: undefined,
        };

        this.onImageLoad = this.onImageLoad.bind(this);
    }

    componentDidMount() {
        this.fetchPokemonData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pokemonId !== this.props.pokemonId) {
            this.fetchPokemonData();
            this.setImageBlur();
        }
    }

    onImageLoad() {
        this.setState({ blur: false });
    }

    getPokemonFlavorText() {
        return this.state.pokemonSpecies.flavor_text_entries.filter(
            ({ language: { name } }) => name === 'en',
        )[0].flavor_text;
    }

    setImageBlur() {
        this.setState({ blur: true });
    }

    fetchPokemonData() {
        const { pokemonId } = this.props;
        const apiPaths = [`${api}pokemon/${pokemonId}`, `${api}pokemon-species/${pokemonId}`];

        const data = Promise.all(apiPaths.map(apiPath => fetch(apiPath).then(res => res.json())));

        data.then(([pokemon, pokemonSpecies]) => this.setState({ pokemon, pokemonSpecies }));
    }

    render() {
        const { blur, pokemon, pokemonSpecies } = this.state;
        const { pokemonId } = this.props;

        return (
            <Wrapper>
                <CardHeader
                    blur={blur}
                    genus={pokemonSpecies && pokemonSpecies.genera[2].genus}
                    name={pokemon && pokemon.name}
                    onImageLoad={this.onImageLoad}
                    pokemonId={pokemonId}
                />
                <CardWrapper>
                    <span>{pokemonSpecies && this.getPokemonFlavorText()}</span>
                </CardWrapper>
            </Wrapper>
        );
    }
}

PokemonCard.propTypes = {
    pokemonId: PropTypes.number.isRequired,
};
