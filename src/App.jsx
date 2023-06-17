import React, { useState } from 'react';
import './App.css';
import HangmanGame from './Hangman';
import StartScreen from './Start/StartScreen';
const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const handleGameOver = () => {
    setGameStarted(false);
  };
  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <StartScreen startGame={startGame} />
      ) : (
        <HangmanGame onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default App;
