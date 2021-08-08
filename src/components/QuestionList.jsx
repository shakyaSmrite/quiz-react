import React from "react";

function QuestionList({ copyData, ques }) {
  return <h1 className="ques1">{copyData[ques].question} </h1>;
}


export default QuestionList;
