import React, { useState, useEffect } from 'react'
import useFetchData from '../hooks/useFetchData'

const Quiz = () => {
  const { questions, isLoading, fetchQuestions } = useFetchData()
  const [actualQuestion, setActualQuestion] = useState(null)
  const [answeredQustions, setAnsweredQuestions] = useState([])

  const userAnswers = {
    answer_a: 'false',
    answer_b: 'false',
    answer_c: 'false',
    answer_d: 'false',
    answer_e: 'false',
    answer_f: 'false'
  }

  useEffect(() => {
    if (questions) {
      setActualQuestion({
        ...questions[0],
        'user-answers': userAnswers
      })
    }
  }, [questions])

  useEffect(() => {
      if (actualQuestion) {
          console.log(actualQuestion['user-answers'])
      }
  }, [actualQuestion])

  const handleAnswerChange = e => {
    const answersByUser = {...userAnswers}
    if (e.target.type === 'radio') {
        answersByUser[e.target.value] = 'true'
      setActualQuestion({ ...actualQuestion, 'user-answers': answersByUser })
    } else {
      setActualQuestion({
        ...actualQuestion,
        'user-answers': {
          ...actualQuestion['user-answers'],
          [e.target.value]: e.target.checked ? 'true' : 'false'
        }
      })
    }
  }

  const getNextQuestion = () => {
    setAnsweredQuestions([...answeredQustions, actualQuestion])
    const index = questions.findIndex(question => question.id === actualQuestion.id)
    setActualQuestion({...questions[index + 1],  'user-answers': userAnswers})
  }

  return (
    <div>
      {actualQuestion && (
        <div>
          <p>{actualQuestion.question}</p>
          {Object.keys(actualQuestion.answers).map(
            (answerKey) =>
              actualQuestion.answers[answerKey] && (
                <div key={answerKey + actualQuestion.id}>
                  <input
                    type={
                      actualQuestion['multiple_correct_answers'] === 'true'
                        ? 'checkbox'
                        : 'radio'
                    }
                    id={answerKey + actualQuestion.id}
                    name={actualQuestion.id}
                    value={answerKey}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor={answerKey + actualQuestion.id}>
                    {actualQuestion.answers[answerKey]}
                  </label>
                </div>
              )
          )}
          <button onClick={getNextQuestion}>Next</button>
        </div>
      )}
    </div>
  )
}

export default Quiz
