import * as React from 'react';

interface InputProps {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
}

export const TextInput: React.StatelessComponent<InputProps> = (props) => {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <div className="field">
                <input
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
