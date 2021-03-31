import { Character } from './Character';
import './CharactersList.css';
import { useRef, useCallback, useEffect, useState } from 'react';

interface CharactersListProps {
    characters: Character[];
    isLoading: boolean;
    loadMore: (id: string) => void;
}

type ColorsMap = Record<string, string>;
const colors: ColorsMap = {
    blond: '#e9c46a',
    fair: '#ffddd2',
    gold: '#ffb703',
    light: '#fdf5e2',
    auburn: '#9d0208',
    'blue-gray': '#8e9aaf',
};

export const CharactersList = (props: CharactersListProps) => {
    const [characterItems, setCharacterItems] = useState([] as any[]);
    const lastItem = useRef();
    useEffect(() => {
        const items: any = props.characters.map((item) => {
            return {
                ...item,
                isOpened: false,
            };
        });
        setCharacterItems(items);
    }, [props.characters]);

    const lastItemRef = useCallback((item) => {
        if (props.isLoading) return;
        let current = lastItem.current as any;
        if (current) current.disconnect();
        current = new IntersectionObserver((items) => {
            if (items[0].isIntersecting) {
                props.loadMore(item.id);
            }
        });
        if (item) current.observe(item);
    }, []);

    const onItemClick = useCallback(
        (name) => {
            const items = [...characterItems];
            items.forEach((item) => {
                if (item.name === name) item.isOpened = !item.isOpened;
            });
            setCharacterItems([...items]);
        },
        [characterItems]
    );

    if (characterItems) {
        return (
            <ul>
                {characterItems.map((character: any, index) => {
                    return index !== characterItems!.length - 1 ? (
                        <div onClick={() => onItemClick(character.name)}>
                            <div className="character-container" id={character.id} key={character.name}>
                                <div className="character-avatar">
                                    <span>{character.name.slice(0, 1)}</span>
                                </div>
                                <div className="character-info">
                                    <h3 className="character-name">{character.name}</h3>
                                    <span>
                                        Gender: {character.gender}, Height: {character.height}, Mass: {character.mass}
                                    </span>
                                </div>
                            </div>
                            {character.isOpened && (
                                <div className="character-details">
                                    {character.skin_color !== 'n/a' && character.skin_color !== 'none' && (
                                        <>
                                            Skin color:
                                            <span
                                                className="color"
                                                style={{
                                                    backgroundColor:
                                                        colors[character.skin_color] || character.skin_color,
                                                }}
                                            ></span>
                                        </>
                                    )}

                                    {character.hair_color !== 'n/a' && character.hair_color !== 'none' && (
                                        <>
                                            Hair color:
                                            <span
                                                className="color"
                                                style={{
                                                    backgroundColor:
                                                        colors[character.hair_color] || character.hair_color,
                                                }}
                                            ></span>
                                        </>
                                    )}

                                    {character.eye_color !== 'n/a' && character.eye_color !== 'none' && (
                                        <>
                                            Eyes color:{' '}
                                            <span
                                                className="color"
                                                style={{ backgroundColor: character.eye_color }}
                                            ></span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div id={character.id} ref={lastItemRef} className="li" key={character.name}>
                            {character.name} {character.id}
                        </div>
                    );
                })}
            </ul>
        );
    } else return <div>Not found</div>;
};
