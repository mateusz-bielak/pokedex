import React from 'react';
import { shallow } from 'enzyme';

import { CardHeader } from '../CardHeader';

const props = [
    {
        blur: false,
        genus: 'Seed Pokémon',
        name: 'Bulbasaur',
        onImageLoad: jest.fn(),
        pokemonId: 1,
    },
    {
        blur: false,
        genus: '',
        name: '',
        onImageLoad: jest.fn(),
        pokemonId: 2,
    },
];

it('render correctly CardHeader component', () => {
    const TextInputComponent = shallow(<CardHeader {...props[0]} />);
    expect(TextInputComponent).toMatchSnapshot();
});

it('use default props for genus and name', () => {
    const component = shallow(<CardHeader {...props[1]} />);

    expect(component.find('Styled(span)').text()).toBe('');
    expect(component.find('span').text()).toBe('');
});
