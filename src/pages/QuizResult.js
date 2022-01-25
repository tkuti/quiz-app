import React, { useContext, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import HTMLComponent from '../components/HTMLComponent'
import { MdClose, MdDone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const QuizResult = () => {
  const {
    answeredQuestions,
    dispatchAnsweredQuestion,
    actualResult,
    setActualResult,
    setQuizOver
  } = useContext(QuizContext)
  let navigate = useNavigate()

  useEffect(() => {
    if (answeredQuestions.length === 0) navigate('/')
  }, [])

  const resetQuiz = target => {
    dispatchAnsweredQuestion({ type: 'CLEAR' })
    setActualResult(null)
    setQuizOver(false)
    navigate(target)
  }

  return (
    <div className='quiz-result'>
      <div className='result-info'>
        <p>
          Your result: {actualResult && <span>{actualResult.result}</span>}%
        </p>
      </div>
      <div className='buttons'>
        <button
          className='rainbow-button'
          value='New quiz'
          onClick={() => resetQuiz('/quiz')}
        ></button>
        <button
          className='rainbow-button'
          value='Home'
          onClick={() => resetQuiz('/')}
        ></button>
      </div>
      <div className='questions'>
        {answeredQuestions.map((question, index) => (
          <div
            key={question + index}
            className={`question-wrapper ${
              question['correct_answer'] === question['user-answer']
                ? 'correct'
                : 'incorrect'
            }`}
          >
            <p className='seq'>{index + 1}. </p>
            <div className='question'>
              <HTMLComponent string={question.question} />
            </div>
            <div className='answers'>
              {question.answers.map(answer => (
                <div key={answer + question.question} className='answer'>
                  <input
                    type='radio'
                    id={answer + question.question}
                    name={question.question}
                    value={answer}
                    checked={answer === question['user-answer'] ? true : false}
                    disabled
                  />
                  <label htmlFor={answer + question.question}>
                    <HTMLComponent string={answer} />
                  </label>
                  {answer === question['correct_answer'] && (
                    <span className='icon correct'>
                      <MdDone />
                    </span>
                  )}
                  {answer === question['user-answer'] &&
                    answer !== question['correct_answer'] && (
                      <span className='icon incorrect'>
                        <MdClose />
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizResult
