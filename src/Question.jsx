import PropTypes from "prop-types";

export default function Question({ id, q, handleClickAnswer }) {
  const answers = q.answers;

  function handleClick(answer) {
    if (q.checked) return;
    handleClickAnswer(id, answer);
  }

  return (
    <div className="question-container">
      <h3 className="question-title">{q.question}</h3>
      {answers.map((answer) => {
        let btnId = null;
        if (q.checked) {
          if (q.correct === answer) btnId = "correct";
          else if (q.selected === answer) btnId = "incorrect";
          else btnId = "not-selected";
        }

        return (
          <button
            key={answer}
            id={btnId}
            className={answer === q.selected ? "answer selected" : "answer"}
            onClick={() => handleClick(answer)}
          >
            {answer}
          </button>
        );
      })}
      <div className="line"></div>
    </div>
  );
}

Question.propTypes = {
  id: PropTypes.string.isRequired,
  handleClickAnswer: PropTypes.func.isRequired,
  q: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct: PropTypes.string.isRequired,
    selected: PropTypes.string,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};
