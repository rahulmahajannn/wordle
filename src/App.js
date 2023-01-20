import "./App.css";
import { useEffect, useState } from "react";
import Grid from "./Components/Grid/Grid";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

// toast.configure();

const WORD_OF_DAY = "ALTER";

function App() {
  const [words, setWords] = useState(
    Array(6).fill(Array(5).fill({ letter: "", background: "" }))
  );
  const [row, setRow] = useState(0);

  async function handleInput(e) {
    console.log("🚀 ~ file: App.js:27 ~ handleInput ~ words[row]", words[row]);
    const word = words[row].map(({ letter }) => letter).join("");
    const wordLength = word.length;
    if (row > 0) {
      const allGreen = words[row - 1].filter(
        ({ background }) => background === "#4d9946"
      );
      if (allGreen.length === 5) {
        alert("Yeah! You cracked the word.");
        // toast.success("🦄 Wow so easy!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        return;
      }
    }

    if (e.key === "Backspace" && wordLength > 0) {
      const updatedSetOfWords = words.map((word) => word.slice());
      updatedSetOfWords[row][wordLength - 1] = { letter: "", background: "" };
      setWords(updatedSetOfWords);
    } else if (e.key === "Enter") {
      if (wordLength < 5) {
        alert("Not Enough Letters");
      } else {
        const updatedWordBackground = words.map((word) => word.slice());
        const letterMap = {};

        WORD_OF_DAY.split("").forEach((letter, index) => {
          letterMap[letter.toLowerCase()] = letterMap[letter.toLowerCase()]
            ? letterMap[letter.toLowerCase()] + 1
            : 1;
        });
        word.split("").forEach((letter, index) => {
          if (letter.toLowerCase() === WORD_OF_DAY[index].toLowerCase()) {
            console.log(
              "🚀 ~ file: App.js:59 ~ word.split ~ letterMap[letter]",
              letterMap[letter]
            );
            console.log("🚀 ~ file: App.js:59 ~ word.split ~ letter", letter);
            letterMap[letter] -= 1;
          }
        });
        updatedWordBackground[row] = updatedWordBackground[row].map(
          ({ letter }, index) => {
            let background = "";
            if (letter.toLowerCase() === WORD_OF_DAY[index].toLowerCase()) {
              background = "#4d9946";
            } else background = "#63636e";

            if (letterMap[letter] > 0 && background !== "#4d9946") {
              background = "#e0c238";
              letterMap[letter] -= 1;
            }
            return { letter, background, border: "none" };
          }
        );
        setWords(updatedWordBackground);
        setRow(row + 1);
      }
    } else if (
      e.key.length === 1 &&
      e.key.toUpperCase() >= "A" &&
      e.key.toUpperCase() <= "Z"
    ) {
      if (wordLength !== 5) {
        const updatedSetOfWords = words.map((word) => word.slice());
        updatedSetOfWords[row][wordLength] = { letter: e.key, background: "" };
        setWords(updatedSetOfWords);
      }
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => window.removeEventListener("keydown", handleInput);
  }, [words, row]);

  return (
    <div className="App">
      <div className="App-header">
        {words.map((characters, index) => (
          <div className="box_row">
            {characters.map(({ letter, background, border }, index) => {
              return (
                <Grid
                  displayText={letter}
                  background={background}
                  border={border}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
