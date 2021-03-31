import * as React from 'react';
import './TextInput.css';

interface InputProps {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    darkStyle: boolean;
    onChange: (value: string) => void;
}

export const TextInput: React.StatelessComponent<InputProps> = (props) => {
    return (
        <div className="input-container">
            {/* <label htmlFor={props.name}>{props.label}</label> */}
            <div className="field">
                <input
                    style={
                        props.darkStyle
                            ? { borderColor: 'white', color: 'white' }
                            : { borderColor: 'black', color: 'black' }
                    }
                    className="text-input"
                    type="text"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={onChangeInput(props)}
                />
            </div>
        </div>
    );
};

const onChangeInput = (props: InputProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
};
