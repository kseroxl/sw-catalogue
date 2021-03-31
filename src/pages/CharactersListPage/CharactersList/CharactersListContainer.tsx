import { Component } from 'react';
import { Character } from './Character';
import { CharactersList } from './CharactersList';
import { Film } from '../FilmsDropDown/FilmsDropDownContainer';

type CharactersFilter = {
    query: string;
    films?: Film[];
};

type CharactersListState = {
    characters: Character[];
    nextPageToLoad: number;
    isErrorOrListEnd: boolean;
    isLoading: boolean;
};

export class CharactersListContainer extends Component<CharactersFilter, CharactersListState> {
    constructor(props: CharactersFilter) {
        super(props);
        this.state = {
            characters: [],
            nextPageToLoad: 1,
            isErrorOrListEnd: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.matchFilter(this.props);
    }

    componentWillReceiveProps(nextProps: CharactersFilter) {
        this.setState({ isErrorOrListEnd: false }, () => this.matchFilter(nextProps));
    }

    matchFilter = async (props: CharactersFilter, id: string = '-1'): Promise<void> => {
        const loadMore: boolean = id !== '-1';
        if (
            (loadMore && +id < +this.state.characters[this.state.characters.length - 1].id) ||
            this.state.isErrorOrListEnd
        ) {
            return;
        }

        let pageNumber = loadMore ? this.state.nextPageToLoad : 1;
        let charactersNumber = loadMore ? 5 : 10;

        const filterResult: Character[] = [];

        this.setState({ isLoading: true });
        while (filterResult.length < charactersNumber && !this.state.isErrorOrListEnd) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SWAPI_SEARCH_PEOPLE_URL}${props.query}&page=${pageNumber++}`
                ).then((res) => {
                    if (res.ok) {
                        return res;
                    } else throw new Error('Result not found');
                });
                const json = await response.json();

                const charactersPage = json.results;
                let charactersLeft: number = 0;
                if (loadMore) {
                    charactersPage.forEach((ch: any, index: number) => {
                        if (ch.name === this.state.characters[this.state.characters.length - 1].name) {
                            charactersLeft = index + 1;
                        }
                    });
                }

                this.setState({ isErrorOrListEnd: charactersPage.length < charactersNumber });
                if (!!charactersPage) {
                    const characters = charactersPage
                        ?.slice(charactersLeft)
                        .map((entry: any) => this.createCharacterModel(entry));
                    this.getCharactersFilms(characters);
                    for (let i = 0; i < characters.length; i++) {
                        if (props.films?.length) {
                            for (let j = 0; j < props.films.length; j++) {
                                if (characters[i].filmIDs?.indexOf(props.films[j].id) !== -1) {
                                    filterResult.push(characters[i]);
                                    break;
                                }
                            }
                        } else {
                            filterResult.push(characters[i]);
                        }
                        if (filterResult.length === charactersNumber) {
                            if (charactersPage[charactersPage.length - 1].name === characters[i].name)
                                this.setState({ nextPageToLoad: pageNumber });
                            else this.setState({ nextPageToLoad: pageNumber - 1 });
                            break;
                        }
                    }
                }
            } catch (e) {
                this.setState({ isErrorOrListEnd: true });
            }
        }
        if (loadMore) {
            const charactersArr = [...this.state.characters, ...filterResult];
            this.setState({ characters: charactersArr, isLoading: false });
        } else {
            this.setState({ characters: filterResult, isLoading: false });
        }
    };

    createCharacterModel(responseEntry: any): Character {
        const urlSplit: string[] = responseEntry.url.split('/');
        return {
            id: urlSplit[urlSplit.length - 2],
            name: responseEntry.name,
            height: responseEntry.height,
            gender: responseEntry.gender,
            mass: responseEntry.mass,
            hair_color: responseEntry.hair_color,
            skin_color: responseEntry.skin_color,
            eye_color: responseEntry.eye_color,
            films: responseEntry.films,
            filmIDs: [],
        };
    }

    getCharactersFilms = (characters: Character[]): void => {
        if (!!characters) {
            for (let i = 0; i < characters.length; i++) {
                for (let j = 0; j < characters[i].films.length; j++) {
                    const filmSplit = characters[i].films[j].split('/');
                    const index = filmSplit[filmSplit.length - 2];
                    characters[i].filmIDs.push(index);
                }
            }
        }
    };

    render() {
        return (
            <div className="characters-list-container">
                <CharactersList
                    characters={this.state.characters || []}
                    isLoading={this.state.isLoading}
                    loadMore={(id: string) => this.matchFilter(this.props, id)}
                />
            </div>
        );
    }
}
