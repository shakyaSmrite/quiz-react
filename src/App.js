import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./api/multipleChoice.json";
import QuestionList from "./components/QuestionList.jsx";
import SubQuestionList from "./components/SubQuestionList";

function App() {
  const copyData = [...data.options];
  const [ques, setQues] = useState(0);

  const [selected, setSelected] = useState([]);
  const defaultColor = "#F3CA40";
  const selectedColor = "#F2A541";

  //correctAnswerList array
  const answerList = [];
  for (let i = 0; i < copyData.length; i++) {
    answerList.push(copyData[i].correctAnswerID);
  }

  //console.log(answerList, "answer list");
  const [score, setScore] = useState([]);

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
  function handleCheckAns(id, ques) {
    const copySelected = [...selected];
    copySelected[ques] = Number(id);
    setSelected([...copySelected]);

    let copyScore = [...score];
    copyScore[ques] = Number(id);
    setScore([...copyScore]);
  }

  //console.log(score, "Score");

  function calculateScore() {
    let counter = 0;
    for (let i = 0; i < score.length; i++) {
      if (score[i] === answerList[i]) {
        counter = counter + 1;
      }
    }
    return counter;
  }

  // console.log(copyScore, "copyscore");
  // console.log(score, "score");

  //display answer options
  function DisplayOptions({ copyData, ques }) {
    const btn = copyData[ques].answers.map((i, index) => (
      <button
        style={{
          backgroundColor: `${
            selected[ques] === index + 1 ? defaultColor : selectedColor
          }`,
        }}
        onClick={() => handleCheckAns(i.id, ques)}
        key={index}
      >
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
            <QuestionList copyData={copyData} ques={ques} />
            <SubQuestionList copyData={copyData} ques={ques} />

            {/*previous and next buttons */}
            <button
              id="btn-prev"
              disabled={handlePrevDisabler(ques)}
              onClick={() => handlePrevClick(ques)}
            >
              Previous
            </button>

            <button
              id="btn-next"
              disabled={handleNextDisabler(ques)}
              onClick={() => handleNextClick(ques)}
            >
              Next
            </button>

            <br />
            <br />

            {/* answer options */}
            <DisplayOptions copyData={copyData} ques={ques} />
          </>
        ) : (
          <>
            <p> Score: {calculateScore()} </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
