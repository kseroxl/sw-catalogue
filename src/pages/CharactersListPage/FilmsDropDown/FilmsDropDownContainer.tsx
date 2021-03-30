import { DropDownList } from '../../../components/DropDownList/DropDownList';
import { Component } from 'react';

type FilmListProps = {
    onFilmSelect: (films: string[]) => void;
};

interface FilmItem {
    id: string;
    name: string;
    isSelected: boolean;
}

type FilmListState = {
    films: FilmItem[];
};

export class FilmsDropDownContainer extends Component<FilmListProps, FilmListState> {
    state: FilmListState = {
        films: [],
    };

    componentDidMount() {
        this.getFilms();
    }

    getFilms(): void {
        fetch(`${process.env.REACT_APP_SWAPI_FILMS_URL}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState((state) => {
                    const films: FilmItem[] = data.results?.map((film: any) => {
                        const urlSplit = film.url.split('/');
                        return {
                            id: urlSplit[urlSplit.length - 2],
                            name: film.title,
                            isSelected: false,
                        };
                    });
                    return { films };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    selectFilm(filmName: string) {
        this.setState((state) => {
            const films = [...state.films];
            const toggledFilm: FilmItem = films.filter((film) => film.name === filmName)[0];
            const index = films.indexOf(toggledFilm);
            const filmToModify = { ...toggledFilm };
            filmToModify.isSelected = !filmToModify.isSelected;
            films[index] = filmToModify;
            this.props.onFilmSelect(films.filter((item) => item.isSelected).map((item) => item.name));
            return {
                films,
            };
        });
    }

    render() {
        return !!this.state.films ? (
            <DropDownList name="Films" onSelect={(filmName) => this.selectFilm(filmName)} list={this.state.films} />
        ) : (
            <p>Loading</p>
        );
    }
}
