import { Component } from 'react';
import { Character } from './Character';
import { CharactersList } from './CharactersList';

type CharactersFilter = {
    query: string;
    films?: any[];
};

type CharactersListState = {
    characters?: Character[];
    isLoading: boolean;
    lastCharacterID: number;
};

export class CharactersListContainer extends Component<CharactersFilter, CharactersListState> {
    state: CharactersListState = {
        characters: [],
        isLoading: false,
        lastCharacterID: 1,
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log(this.getCharacters());
        this.getCharacters().then((data: any) => {
            console.log(data);
            this.setState({ characters: data, isLoading: false });
        });
    }

    componentWillReceiveProps(nextProps: CharactersFilter) {
        console.log(nextProps);
        let filterResult: Character[] = [];
        this.matchFilter();
        console.log(filterResult);
        console.log(filterResult.length);

        this.setState({ isLoading: false });
    }

    matchFilter = async () => {
        const filterResult: Character[] = [];
        let pageNumber = 1;
        while (filterResult.length < 10) {
            console.log('1');
            const response = await fetch(
                `${process.env.REACT_APP_SWAPI_SEARCH_PEOPLE_URL}${this.props.query}&page=${pageNumber++}`
            );
            const json = await response.json();
            const charactersResults = await json.results;
            const characterEntries = await charactersResults?.map((entry: any) => this.createCharacterModel(entry));

            await this.getCharactersFilms([...characterEntries]).then((characters) => {
                console.log(characters);
                for (let i = 0; i < characters.length; i++) {
                    if (this.props.films && this.props.films.length) {
                        const propsFilms = this.props.films || [];
                        console.log(propsFilms);
                        for (let j = 0; j < propsFilms.length; j++) {
                            console.log(characters[i].filmNames);
                            if (characters[i].filmNames?.indexOf(propsFilms[j]) !== -1) {
                                filterResult.push(characters[i]);
                                break;
                            }
                        }
                    } else {
                        filterResult.push(characters[i]);
                    }
                    if (filterResult.length === 10) break;
                }
                console.log(filterResult);
                console.log(filterResult.length);
                // this.setState({ characters: filterResult });
            });
        }
        this.setState({ characters: filterResult });
    };

    createCharacterModel(responseEntry: any): Character {
        const urlSplit: string[] = responseEntry.url.split('/');
        return {
            id: urlSplit[urlSplit.length - 2],
            name: responseEntry.name,
            height: responseEntry.height,
            gender: responseEntry.gender,
            films: responseEntry.films,
            filmNames: [],
        };
    }

    getCharactersFilms = async (characters: Character[]): Promise<Character[]> => {
        console.log(characters);
        console.log(characters.length);
        for (let i = 0; i < characters.length; i++) {
            console.log(characters[i].films);
            for (let j = 0; j < characters[i].films.length; j++) {
                const filmSplit = films[j].split('/');
                const index = filmSplit[filmSplit.length - 2];
                characters[i].filmIDs.push(index);
                // const filmResponse = await fetch(`${characters[i].films[j]}`);
                // const filmJson = await filmResponse.json();
                // const filmName = filmJson.title;
                // characters[i].filmNames.push(filmName);
                // console.log(filmName);
            }
        }
        return characters;
    };

    getCharacters(): Promise<Character[]> {
        this.setState({ isLoading: true });
        return fetch(`${process.env.REACT_APP_SWAPI_PEOPLE_URL}`)
            .then((res) => res.json())
            .then((data) => {
                // this.setState({ characters: data.results, isLoading: false });
                console.log(data);
                return data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return <CharactersList characters={this.state.characters} />;
    }
}
