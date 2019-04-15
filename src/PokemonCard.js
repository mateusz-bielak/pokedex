import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { api, colors } from './variables';

const Wrapper = styled.div`
    width: 60%;
`;

const Header = styled.header`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    height: 15vw;
    width: 100%;
    margin-bottom: 20px;
`;

const CardWrapper = styled.div`
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;
    background-color: ${colors.pokeballSecondary};
`;

const NameCard = styled(CardWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    margin-right: 20px;
`;

const Name = styled.span`
    display: block;

    font-weight: bold;
    text-transform: capitalize;
`;

const Image = styled.img`
    box-sizing: border-box;
    max-height: 15vw;
    padding: 5px;

    border-radius: 20px;
    background-color: ${colors.pokeballSecondary};

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

        const data = Promise.all(apiPaths.map(apiPath => fetch(apiPath).then(res => res.json())));

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
                <CardWrapper>
                    <span>
                        {pokemonSpecies &&
                            pokemonSpecies.flavor_text_entries.filter(
                                ({ language: { name } }) => name === 'en',
                            )[0].flavor_text}
                    </span>
                </CardWrapper>
            </Wrapper>
        );
    }
}

PokemonCard.propTypes = {
    pokemonId: PropTypes.number.isRequired,
};
