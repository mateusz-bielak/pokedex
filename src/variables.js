export const api = 'https://pokeapi.co/api/v2/';

const mediaQ = size => `@media (min-width: ${size}px)`;

export const breakpointsValues = {
    large: 940,
};

export const breakpoints = {
    large: mediaQ(breakpointsValues.large),
};

export const colors = {
    pokeballMain: '#ED5564',
    pokeballSecondary: '#f5f7fa',
    pokeballBorder: '#434a54',
    missingPokemon: '#7A777E',
};

export const fontSizes = {
    medium: '22px',
    large: '28px',
    extraLarge: '36px',
};
