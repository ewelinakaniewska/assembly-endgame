import languages from "../languages";
import { getFarewellText } from "../utils";

export default function GameStatus(props) {
  return (
    <div
      className={
        " text-center mt-5 p-2 mb-6 rounded-[4px] w-[352px] min-h-[70px] flex flex-col justify-center items-center" +
        (props.isGameOver
          ? props.isGameWon
            ? " bg-[#10A95B] "
            : " bg-[#BA2A2A] "
          : props.wrongGuessCount > 0 &&
            !props.currentWord.split("").includes(props.guessedLetters.at(-1))
          ? " bg-[#7A5EA7]  italic "
          : " invisible ")
      }
    >
      <h2 className="text-[1.25rem] text-[#F9F4DA] font-medium">
        {props.isGameOver ? (props.isGameWon ? "You win!" : "Game over!") : ""}
      </h2>
      <p className="text-[1rem] text-[#F9F4DA] font-medium">
        {props.isGameOver
          ? props.isGameWon
            ? "Well done!🎉"
            : "You lose! Better start learning Assembly 😭"
          : `"${getFarewellText(
              props.languages
                .slice(0, props.wrongGuessCount)
                .map((lang) => lang.name)
                .join(" & ")
            )}"`}
      </p>
    </div>
  );
}
