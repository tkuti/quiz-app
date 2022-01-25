import React, { useState, useEffect, useContext } from 'react'
import useFetchData from '../hooks/useFetchData'
import { QuizContext } from '../context/QuizContext'
import { useNavigate } from 'react-router-dom'
import { shuffleArray } from '../helpers/helperFunctions'
import HTMLComponent from '../components/HTMLComponent'
import Timer from '../components/Timer'

const Quiz = () => {
  const { link, dispatchAnsweredQuestion, setQuizOver } =
    useContext(QuizContext)
  const { data: questions, isLoading } = useFetchData(link)
  const [index, setIndex] = useState(0)
  const [actualQuestion, setActualQuestion] = useState(null)
  let navigate = useNavigate()

  useEffect(() => {
    dispatchAnsweredQuestion({ type: 'CLEAR' })
    if (!link) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (questions) {
      const question = questions.results[index]
      const unshuffledAnswers = [
        ...question['incorrect_answers'],
        question['correct_answer']
      ]
      const answers = shuffleArray(unshuffledAnswers)
      setActualQuestion({
        ...questions.results[index],
        'user-answer': '',
        answers
      })
    }
  }, [questions, index])

  const handleAnswerChange = e => {
    setActualQuestion({ ...actualQuestion, 'user-answer': e.target.value })
  }

  const saveAnswer = () => {
    dispatchAnsweredQuestion({ type: 'ADD', payload: actualQuestion })
    if (index < questions.results.length - 1) {
      setIndex(index + 1)
    } else {
      quizOver()
    }
  }


  const quizOver = () => {
    setQuizOver(true)
    navigate('/quiz-result')
  }

  return (
    <div className='quiz'>
      <div className='info-container card'>
        <div className='info-question'>
          <p>
            Category:
            <span>{actualQuestion && actualQuestion.category}</span>
          </p>
          <p>
            Difficulty:
            <span>{actualQuestion && actualQuestion.difficulty}</span>
          </p>
        </div>
        <Timer quizOver={quizOver} />
      </div>
      {actualQuestion && (
        <div className='quiz-container card'>
          <span className='seq'>{index + 1}. </span>
          <div className='question'>
            <HTMLComponent string={actualQuestion.question} />
          </div>
          <div className='answers'>
            {actualQuestion.answers.map(answer => (
              <div key={answer + actualQuestion.question} className='answer'>
                <input
                  type='radio'
                  id={answer + actualQuestion.question}
                  name={actualQuestion.question}
                  value={answer}
                  onChange={handleAnswerChange}
                />
                <label htmlFor={answer + actualQuestion.question}>
                  <HTMLComponent string={answer} />
                </label>
              </div>
            ))}
          </div>
          <button
            className='rainbow-button'
            value={index < questions.results.length - 1 ? 'Next' : 'Send'}
            disabled={actualQuestion['user-answer'] ? false : true}
            onClick={saveAnswer}
          ></button>
        </div>
      )}
    </div>
  )
}

export default Quiz
