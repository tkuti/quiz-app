import React, { useState, useEffect, useContext } from 'react'
import useFetchData from '../hooks/useFetchData'
import { AnsweredQuestionsContext } from '../context/AnsweredQuestionsContext'
import { useNavigate } from 'react-router-dom'
import {shuffleArray} from '../helpers/helperFunctions'
import HTMLComponent from '../components/HTMLComponent'

const Quiz = () => {
  const { data: questions, isLoading, fetchQuestions } = useFetchData()
  const [index, setIndex] = useState(0)
  const [actualQuestion, setActualQuestion] = useState(null)
  const {dispatchAnsweredQuestion} = useContext(AnsweredQuestionsContext)
  let navigate = useNavigate()


  useEffect(() => {
    console.log(questions);
    if (questions) {
      const question = questions.results[index]
      const unshuffledAnswers = [...question['incorrect_answers'], question['correct_answer']]
      const answers = shuffleArray(unshuffledAnswers)
      setActualQuestion({
        ...questions.results[index],
        'user-answer': "",
        answers
      })
    }
  }, [questions, index])


  const handleAnswerChange = e => {
    setActualQuestion({ ...actualQuestion, 'user-answer': e.target.value })
  }

  const saveAnswer = () => {
    dispatchAnsweredQuestion({type: 'ADD', payload: actualQuestion})
    isQuizOver()
  }

  const isQuizOver = () => {
    if (index < questions.results.length - 1) {
      setIndex(index + 1)
    } else {
      navigate('/quiz-result')
    }
  }

  return (
    <div>
      {actualQuestion && (
        <div>
          <span>{index + 1}. </span>
          <HTMLComponent string={actualQuestion.question}/>
           {actualQuestion.answers.map(
            answer =>
                <div key={answer + actualQuestion.question}>
                  <input
                    type='radio'
                    id={answer + actualQuestion.question}
                    name={actualQuestion.question}
                    value={answer}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor={answer + actualQuestion.question}>
                    {answer}
                  </label>
                </div>
              )
          } 
          <button onClick={saveAnswer}>
            {index < questions.length - 1 ? 'Next' : 'Send'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
