import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

import { CardWrapper } from './CardWrapper';
import { breakpoints, colors, getImageSrc } from './variables';

const Header = styled.header`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    height: 20vw;
    width: 100%;
    margin-bottom: 10px;

    ${breakpoints.large} {
        height: 15vw;
        margin-bottom: 20px;
    }
`;

const NameCard = styled(CardWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    margin-right: 5px;
    text-align: center;

    ${breakpoints.large} {
        margin-right: 20px;
    }
`;

const Name = styled.span`
    display: block;

    font-weight: bold;
    text-transform: capitalize;
`;

const Image = styled.img`
    box-sizing: border-box;
    max-height: 100%;
    padding: 5px;

    border-radius: 20px;
    background-color: ${colors.pokeballSecondary};

    filter: ${props => (props.blur ? 'blur(5px)' : 'none')};
`;

export const CardHeader = ({ blur, genus, name, onImageLoad, pokemonId }) => (
    <Header>
        <NameCard>
            <Name>{name}</Name>
            <span>{genus}</span>
        </NameCard>
        <Image src={getImageSrc(pokemonId)} onLoad={onImageLoad} blur={blur} alt="name.png" />
    </Header>
);

CardHeader.propTypes = {
    blur: PropTypes.bool.isRequired,
    genus: PropTypes.string,
    name: PropTypes.string,
    onImageLoad: PropTypes.func.isRequired,
    pokemonId: PropTypes.number.isRequired,
};

CardHeader.defaultProps = {
    genus: '',
    name: '',
};
