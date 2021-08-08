import "./App.css";
import React, { useState } from "react";
import data from "./api/multipleChoice.json";

function App() {
  const copyData = [...data.options];
  const [score, setScore] = useState(0);
  const [ques, setQues] = useState(0);

  //function call to change to next question
  function handleNextClick(i) {
    const nextQuestion = i + 1;
    setQues(nextQuestion);
  }

  //call to move back to previous question
  function handlePrevClick(i) {
    const prevQuestion = i - 1;
    setQues(prevQuestion);
  }

  function handlePrevDisabler(i) {
    if (i === 0) return true;
  }

  function handleNextDisabler(i) {
    if (i === copyData.length) return true;
  }

  //answercheck and score update
  function handleCheckAns(id) {
    id === copyData[ques].correctAnswerID
      ? setScore(score + 1)
      : setScore(score + 0);
  }

  //display answer options
  function DisplayOptions({ copyData, ques }) {
    const btn = copyData[ques].answers.map((i, index) => (
      <button onClick={() => handleCheckAns(i.id)} key={index}>
        {i.answer}
      </button>
    ));
    return btn;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* User */}
        <p className="users">WELCOME Smriti Shakya !! </p>

        {/* Question and subquestion */}
        {ques < copyData.length ? (
          <>
            <h1 className="ques1">{copyData[ques].question} </h1>
            <h2 className="ques2">{copyData[ques].subQuestion}</h2>

            {/*previous and next buttons */}
            <button
              id="btn-next"
              disabled={handleNextDisabler(ques)}
              onClick={() => handleNextClick(ques)}
            >
              Next
            </button>
            <button
              id="btn-prev"
              disabled={handlePrevDisabler(ques)}
              onClick={() => handlePrevClick(ques)}
            >
              Previous
            </button>

            {/* answer options */}
            <DisplayOptions copyData={copyData} ques={ques} />
          </>
        ) : (
          <>
            <p> Score: {score} </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
