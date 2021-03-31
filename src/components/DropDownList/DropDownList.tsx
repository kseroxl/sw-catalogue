import { StatelessComponent, useState } from 'react';
import './DropDownList.css';

export type ListItem = {
    name: string;
    isSelected: boolean;
};

export interface DropDownProps {
    name: string;
    list: ListItem[];
    darkStyle: boolean;
    onSelect: (name: string) => void;
}

export const DropDownList: StatelessComponent<DropDownProps> = (props) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="drop-down-container">
            <div
                className="drop-down-header"
                style={
                    props.darkStyle
                        ? { borderColor: 'white', color: 'rgb(133,133,133)' }
                        : { borderColor: 'black', color: 'black' }
                }
            >
                <span>{props.name}</span>
                <i className={isOpen ? 'fas fa-sort-up' : 'fas fa-sort-down'} onClick={() => setOpen(!isOpen)}></i>
            </div>
            {isOpen && (
                <div style={props.darkStyle ? { color: 'black' } : { color: 'white' }} className="drop-down-list">
                    {props.list
                        .filter((element, index, selfArr) => {
                            return index === selfArr.indexOf(element);
                        })
                        .map((item) => (
                            <label className="list-item" key={item.name}>
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
