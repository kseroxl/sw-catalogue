import React, { useState } from 'react';
// import logo from "./logo.svg";
import './App.css';
import { CharactersListContainer } from './pages/CharactersList/CharactersListContainer';
import { TextInput } from './components/TextInput/TextInput';

function App() {
    const [query, setQuery] = useState('');
    return (
        <div>
            <TextInput name="character-query" label="Search" onChange={setQuery} />
            <CharactersListContainer query={query} />
        </div>
    );
}

export default App;
