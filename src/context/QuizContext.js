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
  const [quizOver, setQuizOver] = useState(false)


  useEffect(() => {
    localStorage.setItem('link', link)
  }, [link])


  useEffect(() => {
    if (answeredQuestions.length > 0) {
      localStorage.setItem('answers', JSON.stringify(answeredQuestions))
    }
  }, [answeredQuestions])


  useEffect(() => {
    if (quizOver) {
      saveResult()
    }
  }, [quizOver])


  useEffect(() => {
    if (actualResult) {
      const newSavedResults = [...savedResults, actualResult]
      setSavedResults(newSavedResults)
      localStorage.setItem('results', JSON.stringify(newSavedResults))
    }
  }, [actualResult])


  const saveResult = () => {
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
        setActualResult,
        savedResults,
        setQuizOver
      }}
    >
      {props.children}
    </QuizContext.Provider>
  )
}
