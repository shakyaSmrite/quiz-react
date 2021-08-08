import React from "react";

function SubQuestionList({ copyData, ques }) {
  return <h2 className="ques2">{copyData[ques].subQuestion}</h2>;
}

export default SubQuestionList;
