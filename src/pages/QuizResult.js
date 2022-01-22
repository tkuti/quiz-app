import React, {useContext} from 'react'
import { AnsweredQuestionsContext } from '../context/AnsweredQuestionsContext'

const QuizResult = () => {
    const {answeredQuestions} = useContext(AnsweredQuestionsContext)

console.log(answeredQuestions);
  return (
  <div>
      {
          answeredQuestions.map((question, index) => 
          <div key={question} className="question">
              <span>{index + 1}. </span>
              <p dangerouslySetInnerHTML={{__html:`${question.question}`}} />
          </div>
          )
      }
  </div>
  );
};

export default QuizResult;
