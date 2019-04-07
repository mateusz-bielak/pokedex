import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { api, colors } from './variables';

const Wrapper = styled.div`
    width: 60%;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
`;

const NameCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 50px;
    width: 100%;
    margin-right: 20px;

    border-radius: 20px;
    background-color: ${colors.pokeballSecondary};
`;

const Name = styled.span`
    display: block;

    font-weight: bold;
    text-transform: capitalize;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    max-height: 200px;
    max-width: 200px;

    filter: ${props => (props.blur ? 'blur(5px)' : 'none')};
`;

export class PokemonCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            blur: false,
            pokemon: undefined,
            pokemonSpecies: undefined,
        };
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

    setImageBlur() {
        this.setState({ blur: true });
    }

    fetchPokemonData() {
        const { pokemonId } = this.props;
        const apiPaths = [`${api}pokemon/${pokemonId}`, `${api}pokemon-species/${pokemonId}`];

        const data = Promise.all([apiPaths.map(apiPath => fetch(apiPath).then(res => res.json()))]);

        data.then(([pokemon, pokemonSpecies]) => this.setState({ pokemon, pokemonSpecies }));
    }

    render() {
        const { blur, pokemon, pokemonSpecies } = this.state;
        const { pokemonId } = this.props;

        return (
            <Wrapper>
                <Header>
                    <NameCard>
                        <Name>{pokemon && pokemon.name}</Name>
                        <span>{pokemonSpecies && pokemonSpecies.genera[2].genus}</span>
                    </NameCard>
                    <Image
                        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`}
                        onLoad={() => this.setState({ blur: false })}
                        blur={blur}
                        alt="poke"
                    />
                </Header>
            </Wrapper>
        );
    }
}

PokemonCard.propTypes = {
    pokemonId: PropTypes.number.isRequired,
};
