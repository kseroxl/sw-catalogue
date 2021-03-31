import { Character } from './Character';
import './CharactersList.css';
import { useRef, useCallback } from 'react';

interface CharactersListProps {
    characters: Character[];
    isLoading: boolean;
    loadMore: (id: string) => void;
}

export const CharactersList = (props: CharactersListProps) => {
    const lastItem = useRef();
    const lastItemRef = useCallback((item) => {
        if (props.isLoading) return;
        let current = lastItem.current as any;
        if (current) current.disconnect();
        current = new IntersectionObserver((items) => {
            if (items[0].isIntersecting) {
                console.log('Visible');
                props.loadMore(item.id);
            }
        });
        if (item) current.observe(item);
    }, []);
    if (props.characters) {
        return (
            <ul>
                {props.characters.map((character, index) => {
                    return index !== props.characters!.length - 1 ? (
                        <li id={character.id} className="li" key={character.name}>
                            {character.name} {character.id}
                        </li>
                    ) : (
                        <li id={character.id} ref={lastItemRef} className="li" key={character.name}>
                            {character.name} {character.id}
                        </li>
                    );
                })}
            </ul>
        );
    } else return <div>Not found</div>;
};
