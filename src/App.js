import React, { useState } from 'react';
import './App.css';
import { Hangman } from './components';

const randomWords = require('random-words');

const App = () => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState(randomWords());

  const submitGuess = () => {
    setGuesses([...guesses, ...guess]);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React Hangman</h1>
        <Hangman incorrectGuessCount={10}></Hangman>
        <span style={styles.word}>{word.split('').map(() => '_ ')}</span>
        <input
          style={styles.input}
          value={guess}
          onChange={e => setGuess(e.target.value)}
          type="text"
          id="guess"
          name="guess"
          required
          minLength="1"
          maxLength="1"
          size="1"
        />
        <button onClick={() => submitGuess()}>Guess</button>
        <button onClick={() => setWord(randomWords())}>New Game</button>
      </div>
    </div>
  );
};

const styles = {
  word: {
    fontSize: '50px',
  },
  input: {
    fontSize: '50px',
  },
};

export default App;
