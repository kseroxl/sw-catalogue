import { StatelessComponent, useState } from 'react';

export type ListItem = {
    name: string;
    isSelected: boolean;
};

interface DropDownProps {
    name: string;
    list: ListItem[];
    onSelect: (name: string) => void;
}

export const DropDownList: StatelessComponent<DropDownProps> = (props) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div>
            <div>
                <span>{props.name}</span>
                <button onClick={() => setOpen(!isOpen)}>Open</button>
            </div>
            {isOpen && (
                <div>
                    {props.list
                        .filter((element, index, selfArr) => {
                            return index === selfArr.indexOf(element);
                        })
                        .map((item) => (
                            <label key={item.name}>
                                <input
                                    type="checkbox"
                                    checked={item.isSelected}
                                    value={item.name}
                                    onChange={() => props.onSelect(item.name)}
                                />
                                {item.name}
                                <br />
                            </label>
                        ))}
                </div>
            )}
        </div>
    );
};
