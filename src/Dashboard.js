import React, { Component } from 'react';

export class Dashboard extends Component {
    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(res => res.json())
            .then(({ results }) => this.setState({ results }));
    }

    render() {
        return this.state ? (
            <>
                {this.state.results.map(({ name }, index) => (
                    <p key={name}>
                        {index + 1}. {name}
                    </p>
                ))}
            </>
        ) : (
            <p>Loading</p>
        );
    }
}
