import { Component } from 'react';
import { TextInput } from '../../components/TextInput/TextInput';
import { FilmsDropDownContainer, Film } from './FilmsDropDown/FilmsDropDownContainer';
import { CharactersListContainer } from './CharactersList/CharactersListContainer';
import './CharactersListPage.css';

type CharactersFilter = {
    query: string;
    films?: Film[];
};

export class CharactersListPage extends Component<{}, CharactersFilter> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: '',
            films: [],
        };
    }

    setFilms(films: Film[]): void {
        this.setState({ films: films });
    }

    setQuery(query: string): void {
        this.setState({ query });
    }

    render() {
        return (
            <div className="layout-container">
                <div className="layout" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/space.png')` }}>
                    <div className="header">
                        <h1>Star Wars Catalogue</h1>
                        <div className="header-items">
                            <TextInput
                                darkStyle={true}
                                name="character-query"
                                placeholder="Search"
                                label="Search"
                                onChange={(query) => this.setQuery(query)}
                            />
                            <FilmsDropDownContainer onFilmSelect={(films) => this.setFilms(films)} />
                        </div>
                    </div>
                    <CharactersListContainer {...this.state} />
                </div>
            </div>
        );
    }
}
