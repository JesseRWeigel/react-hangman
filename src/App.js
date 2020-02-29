import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Hangman } from './components';

const randomWords = require('random-words');

const App = () => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [wordArr, setWordArr] = useReducer(reducer, []);
  const [score, setScore] = useState(10);

  function reducer(state = [], action) {
    switch (action.type) {
      case 'update':
        return [...action.data];
      default:
        throw new Error();
    }
  }

  const submitGuess = () => {
    if (!guesses.includes(guess)) {
      let falseGuess = true;
      wordArr.forEach((wordObj, i) => {
        if (wordObj.letter === guess) {
          let newWordArr = wordArr;
          newWordArr[i].guessed = true;
          setWordArr({ data: newWordArr, type: 'update' });
          falseGuess = false;
        }
      });
      if (falseGuess) {
        setGuesses([...guesses, ...guess]);
        setScore(score - 1);
      }
    }
    setGuess('');
  };

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    let wordArray = [];
    randomWords()
      .split('')
      .forEach(letter => wordArray.push({ letter: letter, guessed: false }));
    setWordArr({ data: wordArray, type: 'update' });
    setScore(10);
    setGuesses([]);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React Hangman</h1>
        {score > 0 ? (
          <div>
            <Hangman incorrectGuessCount={score}></Hangman>
            <span style={styles.word}>
              {wordArr.map(wordObj => (wordObj.guessed ? wordObj.letter + ' ' : '_ '))}
            </span>
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
              onKeyPress={e => e.key === 'Enter' && submitGuess()}
            />
            <button onClick={() => submitGuess()}>Guess</button>
            <button onClick={() => newWord()}>New Game</button>
            <span>{guesses.map(g => g + ' ')}</span>
          </div>
        ) : (
          <div>
            <span>Do you want to try again?</span>
            <button onClick={() => newWord()}>New Game</button>
          </div>
        )}
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
