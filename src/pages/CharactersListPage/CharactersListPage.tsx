import { Component } from 'react';
import { TextInput } from '../../components/TextInput/TextInput';
import { FilmsDropDownContainer } from './FilmsDropDown/FilmsDropDownContainer';
import { CharactersListContainer } from './CharactersList/CharactersListContainer';

type CharactersFilter = {
    query: string;
    films?: any[];
};

export class CharactersListPage extends Component<{}, CharactersFilter> {
    state: CharactersFilter = {
        query: '',
        films: [],
    };

    setFilms(films: string[]): void {
        this.setState({ films: films });
    }

    setQuery(query: string): void {
        this.setState({ query });
    }

    render() {
        return (
            <div>
                <TextInput name="character-query" label="Search" onChange={() => this.setQuery} />
                <FilmsDropDownContainer onFilmSelect={(films) => this.setFilms(films)} />
                <CharactersListContainer query={this.state.query} films={this.state.films} />
            </div>
        );
    }
}
