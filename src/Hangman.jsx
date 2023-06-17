import React, { useState, useEffect } from 'react';
import './Hangman.css';

let quizData = [
  {
    question: 'What is the T in STS?',
    word: 'TECHNOLOGY',
  },
  {
    question: 'What is the second S in STS?',
    word: 'SOCIETY',
  },
  {
    question: 'What is the first s in STS?',
    word: 'SCIENCE',
  },
  {
    question:
      'His 1651 work on embryology – proposed a unified principle of developmental and reproduction that was applicable across all species.',
    word: 'WILLIAM HARVEY',
  },
  {
    question:
      'He classified animals according to whether they reproduced by means of: external eggs, viviparity, spontaneous generation',
    word: 'ARISTOTLE',
  },
  {
    question:
      'Italian scientist - who proposed Pre-formationism was a theory of embryological development',
    word: 'MARCELLO MALPIGHI',
  },
  {
    question:
      'Proposed developmental stages recapitulate adult evolutionary stages. Based on descriptive and observational approaches',
    word: 'EARNST HAECKEL',
  },
  {
    question:
      'Question posed by the historian Joseph Needham regarding the technological and scientific advancements of ancient China',
    word: 'NEEDHAM QUESTION',
  },
  {
    question: 'Long-term Wife of Needham (1896-1987)',
    word: 'DOROTHY MOYLE',
  },
  {
    question: 'Long-term Lover of Needham(1904-1991)',
    word: 'LU GWEI DJEN',
  },
  {
    question:"Claimed to have used the CRISPR-Cas9 gene editing tool to modify the embryos of twin girls",
    word:"HE JIANKUI"
  },
  {
    question:"Has controversy in creating stem cell lines using SCNT",
    word:"WOOSUK HWANG",
  },
  {
    question:"It can become a tool for social cohabitation, as well as knowledge enhancement",
    word:"DIALOGUE"
  },
  {
    question:"Type of Knowledge that emphasizes the symbiotic character of humans and nature",
    word:"TRADITIONAL"
  },
  {
    question:"From the perspective of this individual, China was hydraulic, changeless, cruel, obedient",
    word:"WITTFOGEL"
  }
];

const maxWrongAttempts = 6;

const HangmanGame = ({ onGameOver }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [hiddenWord, setHiddenWord] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const qwertyLayout = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  const handleLetterGuess = (letter) => {
    if (!guessedLetters.has(letter)) {
      const newGuessedLetters = new Set(guessedLetters);
      newGuessedLetters.add(letter);
      setGuessedLetters(newGuessedLetters);
      console.log(letter,selectedWord);
      if (!selectedWord.includes(letter) && letter !== ' ') {
        setWrongAttempts(wrongAttempts + 1);
      }

      const updatedHiddenWord = selectedWord.split('').map((char, index) => {
        if (char === ' ') {
          return <div key={index} className="space"> </div>;
        } else if (guessedLetters.has(char)) {
          return (
            <div key={index} className="box">
              {char}
            </div>
          );
        } else {
          return <div key={index} className="box"></div>;
        }
      });
      setHiddenWord(updatedHiddenWord);
    }
  };

  const handleCorrectAnswer = () => {
    setIsCorrectModalOpen(true);
  };

  const handleNextQuestion = () => {
    setIsCorrectModalOpen(false);
    if (score === quizData.length - 1) {
      alert('Congratulations! You completed the game!');
      setCurrentQuestion(0);
      setScore(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    onGameOver(); // Call the provided onGameOver function from the parent component
  };

  const initializeGame = () => {
    // Shuffle the quizData and corresponding words together
    const shuffledData = [...quizData];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    quizData=shuffledData;
    const { word, question } = quizData[currentQuestion];
    const initialHiddenWord = Array.from({ length: word.length }, () => '');
    setSelectedWord(word.toUpperCase());
    setHiddenWord(initialHiddenWord);
    setGuessedLetters(new Set());
    setWrongAttempts(0);
  };
  
  useEffect(() => {
    initializeGame();
  }, [currentQuestion]);

  useEffect(() => {
    const updatedHiddenWord = selectedWord.split('').map((char, index) => {
      if (char === ' ') {
        return <div key={index} className="space">{char}</div>;
      } else if (guessedLetters.has(char)) {
        return (
          <div key={index} className="box">
            {char}
          </div>
        );
      } else {
        return <div key={index} className="box"></div>;
      }
    });
    setHiddenWord(updatedHiddenWord);

    if (
      updatedHiddenWord
        .map((element) => (element.key === ' ' ? ' ' : element.props.children))
        .join('') === selectedWord &&
      selectedWord !== ''
    ) {
      setScore(score + 1);
      handleCorrectAnswer();
    } else if (wrongAttempts === maxWrongAttempts) {
      setIsGameOver(true);
    }
  }, [guessedLetters, wrongAttempts, selectedWord]);

  if (isGameOver) {
    return (
      <div className="game-over-screen">
        <center>
        <h1 className="game-over-text">GAME OVER</h1>
        <h2>Score:{score}</h2>
        <button className="game-over-button" onClick={handleGameOver}>
          Restart
        </button>
        </center>
      </div>
    );
  }

  return (
    <div className="game">
      <h2 className="header">
        <p>Score: {score}</p>
        <p>Wrong attempts: {wrongAttempts}/{maxWrongAttempts}</p>
      </h2>
      <center>
        <h1>{quizData[currentQuestion].question}</h1>
      </center>
      <p>Guess the word:</p>
      <div className="hidden-word">{hiddenWord}</div>
      <div className="keyboard">
        {qwertyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split('').map((letter, index) => {
              const isDisabled =
                guessedLetters.has(letter) ||
                guessedLetters.has(letter.toUpperCase()) ||
                wrongAttempts === maxWrongAttempts;
              return (
                <button
                  key={letter}
                  onClick={() => handleLetterGuess(letter)}
                  disabled={isDisabled}
                >
                  {letter.toUpperCase()}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {isCorrectModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Correct Answer!</h1>
            <button onClick={handleNextQuestion}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
