import { DropDownList, ListItem } from '../../../components/DropDownList/DropDownList';
import { Component } from 'react';

export interface Film {
    id: string;
    name: string;
}

type FilmItem = ListItem & Film;

interface FilmListState {
    filmsItems: FilmItem[];
}

interface FilmListProps {
    onFilmSelect: (films: any) => void;
}

export class FilmsDropDownContainer extends Component<FilmListProps, FilmListState> {
    constructor(props: FilmListProps) {
        super(props);
        this.state = {
            filmsItems: [],
        };
    }

    componentDidMount() {
        this.getFilms();
    }

    getFilms(): void {
        fetch(`${process.env.REACT_APP_SWAPI_FILMS_URL}`)
            .then((response) => {
                if (!response.ok) throw new Error('Results not found');
                return response.json();
            })
            .then((data) => {
                this.setState((state) => {
                    const filmsItems: FilmItem[] = data.results?.map((film: any) => {
                        const urlSplit = film.url.split('/');
                        const filmItem: Film = { id: urlSplit[urlSplit.length - 2], name: film.title };
                        return {
                            ...filmItem,
                            isSelected: false,
                        };
                    });
                    return { filmsItems };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    selectFilm(filmName: string) {
        this.setState((state) => {
            const filmsItems = [...state.filmsItems];
            const toggledFilmItem: FilmItem = filmsItems.filter((filmItem) => filmItem.name === filmName)[0];
            const index = filmsItems.indexOf(toggledFilmItem);
            const filmToModify = { ...toggledFilmItem };
            filmToModify.isSelected = !filmToModify.isSelected;
            filmsItems[index] = filmToModify;
            this.props.onFilmSelect(
                filmsItems
                    .filter((item) => item.isSelected)
                    .map((item) => {
                        return { id: item.id, name: item.name };
                    })
            );
            return {
                filmsItems,
            };
        });
    }

    render() {
        return !!this.state.filmsItems ? (
            <DropDownList
                name="Films"
                onSelect={(filmName) => this.selectFilm(filmName)}
                list={this.state.filmsItems.map((filmItem) => {
                    const { id, ...listItem } = filmItem;
                    return listItem;
                })}
            />
        ) : (
            <p>Loading</p>
        );
    }
}
