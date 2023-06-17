import React from 'react';
import './StartScreen.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className="start-screen">
    <center>
      <h1>The STS Random Knowledge Game (Hangman Edition)!</h1></center>
      <p>This is a hangman type game that contains random knowledge that can be learned from the class (or not)</p>
      <button onClick={startGame}>Start Game</button>
      <p> This is a mini creative project made for STS 1 by: John David Vidad</p>
    </div>
  );
};

export default StartScreen;
