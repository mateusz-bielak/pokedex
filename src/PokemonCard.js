import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { CardHeader } from './CardHeader';
import { CardWrapper } from './CardWrapper';
import { breakpoints, urls } from './variables';

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;

    ${breakpoints.large} {
        position: absolute;
        right: 20px;
        top: 20px;
        padding-left: 20px;
        box-sizing: border-box;
        width: 60%;
        margin-bottom: 20px;
    }
`;

export class PokemonCard extends React.PureComponent {
    state = {
        blur: false,
        pokemon: undefined,
        pokemonSpecies: undefined,
    };

    componentDidMount() {
        this.fetchPokemonData();
        this.setImageBlur();
    }

    getPokemonFlavorText = () =>
        this.state.pokemonSpecies.flavor_text_entries.filter(
            ({ language: { name } }) => name === 'en',
        )[0].flavor_text;

    onImageLoad = () => {
        this.setImageBlur(false);
    };

    setImageBlur = (blur = true) => {
        this.setState({ blur });
    };

    fetchPokemonData = () => {
        const { pokemonId } = this.props;
        const apiPaths = [
            `${urls.api}pokemon/${pokemonId}`,
            `${urls.api}pokemon-species/${pokemonId}`,
        ];

        const data = Promise.all(apiPaths.map(apiPath => fetch(apiPath).then(res => res.json())));

        data.then(([pokemon, pokemonSpecies]) => this.setState({ pokemon, pokemonSpecies }));
    };

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
