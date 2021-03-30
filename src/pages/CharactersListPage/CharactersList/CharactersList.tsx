import { Character } from './Character';

type Props = {
    characters?: Character[];
};

export const CharactersList = (props: Props) => {
    if (props.characters) {
        return (
            <ul>
                {props.characters.map((character) => (
                    <li key={character.name}>{character.name}</li>
                ))}
            </ul>
        );
    } else return <div>Not found</div>;
};
