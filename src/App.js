import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Hangman } from './components';

const randomWords = require('random-words');

const App = () => {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [wordArr, setWordArr] = useReducer(reducer, []);
  const [score, setScore] = useState(10);
  const [win, setWin] = useState(false);

  function reducer(state = [], action) {
    switch (action.type) {
      case 'update':
        return [...action.data];
      default:
        throw new Error();
    }
  }

  const submitGuess = () => {
    if (!guesses.includes(guess) && guess !== '') {
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
    checkForWin();
    setGuess('');
  };

  const checkForWin = () => {
    if (wordArr.every(wordObj => wordObj.guessed === true)) {
      setWin(true);
    }
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
    setWin(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>React Hangman</h1>
        {score > 0 ? (
          win ? (
            <div>
              <span>Congratulations! You Won!</span>
              <button style={styles.newGame} onClick={() => newWord()}>
                New Game
              </button>
            </div>
          ) : (
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
              <button style={styles.newGame} onClick={() => newWord()}>
                New Game
              </button>
              <span>{guesses.map(g => g + ' ')}</span>
            </div>
          )
        ) : (
          <div>
            <span>Do you want to play again?</span>
            <button style={styles.newGame} onClick={() => newWord()}>
              New Game
            </button>
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
    margin: '8px',
  },
  newGame: {
    margin: '8px',
  },
};

export default App;
