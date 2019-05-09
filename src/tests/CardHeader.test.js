import React from 'react';
import { shallow } from 'enzyme';

import { CardHeader } from '../CardHeader';
import { getImageSrc } from '../variables';

const mockedProps = [
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

describe('Snapshot testing', () => {
    it('render correctly CardHeader component', () => {
        const props = mockedProps[0];
        const TextInputComponent = shallow(<CardHeader {...props} />);

        expect(TextInputComponent).toMatchSnapshot();
    });
});

describe('Props testing', () => {
    it('use default props for genus and name', () => {
        const props = mockedProps[1];
        const component = shallow(<CardHeader {...props} />);

        expect(component.find('Styled(span)').text()).toBe('');
        expect(component.find('span').text()).toBe('');
    });

    it('use custom props', () => {
        const props = mockedProps[0];
        const component = shallow(<CardHeader {...props} />);

        expect(component.find('Styled(span)').text()).toBe(props.name);
        expect(component.find('span').text()).toBe(props.genus);
        expect(component.find('Styled(img)').prop('src')).toBe(getImageSrc(props.pokemonId));
        expect(component.find('Styled(img)').prop('blur')).toBe(props.blur);
    });
});

describe('Events testing', () => {
    it('use on load image event', () => {
        const props = mockedProps[0];
        const component = shallow(<CardHeader {...props} />);

        component.find('Styled(img)').simulate('load');
        expect(props.onImageLoad).toHaveBeenCalled();
    });
});
