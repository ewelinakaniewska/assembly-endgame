import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import languages from "./languages.js";
import { useState } from "react";
import { getRandomWord } from "./utils.js";
import Confetti from "react-confetti";

export default function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameOver = isGameLost || isGameWon;

  function guess(letter) {
    setGuessedLetters((prevGuessedLetters) =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter]
    );
  }

  const keyboard = alphabet.split("").map((letter) => {
    return (
      <button
        className={
          (!guessedLetters.includes(letter)
            ? " bg-[#FCBA29] "
            : currentWord.includes(letter)
            ? " bg-[#10A95B] "
            : " bg-[#EC5D49] ") +
          "size-[40px] text-black rounded-[4px] border border-[#D7D7D7] text-[1rem] font-[600] " +
          (isGameOver ? " opacity-50 " : "")
        }
        key={letter}
        onClick={() => {
          guess(letter);
        }}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const languagesList = languages.map((lang, index) => (
    <div
      key={lang.name}
      className={
        " p-1 rounded-[3px] font-[600] text-[0.75rem] relative" +
        (index < wrongGuessCount ? " lost " : null)
      }
      style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
    >
      {lang.name}
    </div>
  ));

  const currentWordArray = currentWord.split("");
  const currentWordCharList = currentWordArray.map((letter, index) => {
    return (
      <span
        key={index}
        className={
          "size-[40px] block bg-[#323232] border-b-1 border-b-[#F9F4DA] text-[1.125rem] font-bold text-[#F9F4DA] flex items-center justify-center"
        }
        style={guessedLetters.includes(letter) ? null : { color: ["#EC5D49"] }}
      >
        {isGameOver
          ? letter.toUpperCase()
          : guessedLetters.includes(letter)
          ? letter.toUpperCase()
          : ""}
      </span>
    );
  });

  function newGame() {
    setCurrentWord(getRandomWord);
    setGuessedLetters([]);
  }

  return (
    <main className="min-w-[300px] flex flex-col items-center">
      {isGameWon && <Confetti recycle={false} />}
      <Header />
      <GameStatus
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isGameOver={isGameOver}
        wrongGuessCount={wrongGuessCount}
        languages={languages}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        aria-live="polite"
        role="status"
      />
      <div className="flex flex-row flex-wrap max-w-[280px] justify-center gap-1 m-auto">
        {languagesList}
      </div>
      <section className="flex flex-row justify-center align-center gap-[2px] m-9">
        {currentWordCharList}
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(guessedLetters.at(-1))
            ? `Correct! The letter ${guessedLetters.at(-1)} is in the word`
            : `The letter ${guessedLetters.at(-1)} was not in the word`}
          Youn have {languages.length - 1} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank"
            )
            .join(" ")}
        </p>
      </section>

      <section className="flex flex-row justify-center align-center gap-2 flex-wrap max-w-[480px] mb-10">
        {keyboard}
      </section>
      {isGameOver && (
        <button
          className="w-[228px] h-[40px] bg-[#11B5E5] text-[#1E1E1E] text-[1rem] border border-[#D7D7D7] rounded-[4px] font-[600] cursor-pointer"
          onClick={newGame}
        >
          New game
        </button>
      )}
    </main>
  );
}
