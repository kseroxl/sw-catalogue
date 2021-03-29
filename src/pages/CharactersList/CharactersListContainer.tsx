import { Component } from 'react';
import { Character } from './Character';

interface Props {
    query: string;
}

type CharactersListState = {
    characters?: Character[];
    isLoading: boolean;
    filter: string;
};

export class CharactersListContainer extends Component<Props, CharactersListState> {
    state: CharactersListState = {
        characters: [],
        isLoading: false,
        filter: '',
    };

    componentDidMount() {
        this.getCharacters();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.query !== this.state.filter) {
            this.setState({ filter: nextProps.query }, () => {
                this.getCharacters();
            });
        }
    }

    getCharacters(): void {
        this.setState({ isLoading: true });
        fetch(`${process.env.REACT_APP_SWAPI_SEARCH_PEOPLE_URL}${this.state.filter}`)
            .then((res) => res.json())
            .then((characters) => {
                console.log(characters);
                this.setState({ characters, isLoading: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return null;
    }
}
