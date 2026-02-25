import { useState, useEffect } from "react";
import Menu from "./Menu.jsx";
import Question from "./Question.jsx";
import blob from "./assets/blob.svg";
import he from "he";
import { nanoid } from "nanoid";

function App() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [checked, setChecked] = useState(false);
  const [questions, setQuestions] = useState([]);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  // Helper to safely decode Base64 + HTML entities
  function safeDecode(str) {
    try {
      return he.decode(atob(str));
    } catch {
      return he.decode(str);
    }
  }

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=base64",
      );
      const data = await res.json();

      const q = data.results.map((question) => {
        const decodedQuestion = safeDecode(question.question);
        const decodedCorrectAnswer = safeDecode(question.correct_answer);
        const decodedIncorrectAnswers =
          question.incorrect_answers.map(safeDecode);

        return {
          id: nanoid(),
          question: decodedQuestion,
          correct: decodedCorrectAnswer,
          selected: null,
          checked: false,
          answers: shuffleArray([
            ...decodedIncorrectAnswers,
            decodedCorrectAnswer,
          ]),
        };
      });

      setQuestions(q);
    }

    getQuestion();
  }, [count]);

  function handleCheck() {
    const allSelected = questions.every((q) => q.selected !== null);
    if (!allSelected) return;

    setQuestions((questions) =>
      questions.map((question) => ({ ...question, checked: true })),
    );
    setChecked(true);

    const correctCount = questions.reduce(
      (acc, question) => acc + (question.selected === question.correct ? 1 : 0),
      0,
    );
    setCorrect(correctCount);
  }

  function handleClickAnswer(id, answer) {
    setQuestions((questions) =>
      questions.map((q) => (q.id === id ? { ...q, selected: answer } : q)),
    );
  }

  function handlePlayAgain() {
    setCount((c) => c + 1);
    setChecked(false);
  }

  const questionElement = questions.map((question) => (
    <Question
      key={question.id}
      q={question}
      handleClickAnswer={handleClickAnswer}
      id={question.id}
    />
  ));

  function start() {
    setStarted(true);
  }

  return (
    <div className="main-container">
      <div className="content-container">
        {started ? (
          <div className="start-content-container">
            {questionElement}
            <div className="end-div">
              {checked && <span className="score">You scored {correct}/5</span>}
              <button
                className="check"
                onClick={checked ? handlePlayAgain : handleCheck}
              >
                {checked ? "Play Again" : "Check Answer"}
              </button>
            </div>
          </div>
        ) : (
          <Menu start={start} />
        )}
      </div>

      <div className="blob">
        <img className="blob-svg" src={blob} alt="" />
      </div>
    </div>
  );
}

export default App;
