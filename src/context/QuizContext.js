import { useState, useEffect, useReducer, createContext } from 'react'

export const QuizContext = createContext()

export const QuizContextProvider = props => {
  const [link, setLink] = useState(localStorage.getItem('link') || null)
  const [gameOptions, setGameOptions] = useState({
    difficulty: 'random',
    category: '0',
    categoryName: 'Random'
  })
  const [actualResult, setActualResult] = useState(null)
  const [savedResults, setSavedResults] = useState(
    JSON.parse(localStorage.getItem('results')) || []
  )
  const [answeredQuestions, dispatchAnsweredQuestion] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD':
          return [...state, action.payload]
        case 'CLEAR':
          return []
        default:
          return state
      }
    },
    JSON.parse(localStorage.getItem('answers')) || []
  )

  useEffect(() => {
    localStorage.setItem('link', link)
  }, [link])

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answeredQuestions))
    if (answeredQuestions.length === 10) {
      const userResult = answeredQuestions.reduce(
        (total, question) =>
          question['user-answer'] === question['correct_answer']
            ? total + 1
            : total,
        0
      )
      setActualResult({
        result: userResult * 10,
        category: gameOptions.categoryName,
        difficulty: gameOptions.difficulty
      })
    }
  }, [answeredQuestions])

  useEffect(() => {
    if (actualResult) {
      setSavedResults([...savedResults, actualResult])
    }
  }, [actualResult])

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(savedResults))
  }, [savedResults])

  return (
    <QuizContext.Provider
      value={{
        link,
        setLink,
        gameOptions,
        setGameOptions,
        answeredQuestions,
        dispatchAnsweredQuestion,
        actualResult,
        setActualResult
      }}
    >
      {props.children}
    </QuizContext.Provider>
  )
}
