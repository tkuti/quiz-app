import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Diagram from '../components/Diagram'
import { useNavigate } from 'react-router-dom'

const MyResults = () => {
  const { savedResults } = useContext(QuizContext)
  const [myResult, setMyResult] = useState({
    average: 0,
    numberOfQuizes: 0
  })
  let navigate = useNavigate()

  useEffect(() => {
    const average = Math.round(
      savedResults.reduce((sum, result) => result.result + sum, 0) /
        savedResults.length
    )
    const numberOfQuizes = savedResults.length
    setMyResult({ ...myResult, average, numberOfQuizes })
  }, [])

  return (
    <div className='my-results'>
      <button
        className='rainbow-button'
        value='Home'
        onClick={() => navigate('/')}
      ></button>
      <div className='info-wrapper'>
        <h2>Results</h2>
        <p className='result-info'>
          Average result: <span>{myResult.average}</span>%
        </p>
        <p className='result-info'>
          Number of quizes: <span>{myResult.numberOfQuizes}</span>
        </p>
      </div>
      <div className='diagram-wrapper'>
        {savedResults.length ? (
          <>
            <h2>Diagram</h2>
            <Diagram />
          </>
        ) : (
          <p>
            It seems you haven't completed any tests yet! Go back to change
            that!{' '}
          </p>
        )}
      </div>
    </div>
  )
}

export default MyResults
