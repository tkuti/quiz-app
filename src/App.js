import './App.css'
import Welcome from './pages/Welcome'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { GameOptionContextProvider } from './context/GameOptionsContext'
import { AnsweredQuestionsContextProvider } from './context/AnsweredQuestionsContext'

function App() {
  return (
    <div className='App'>
      <GameOptionContextProvider>
        <AnsweredQuestionsContextProvider>
          <HashRouter>
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='/quiz' element={<Quiz />} />
              <Route path='/quiz-result' element={<QuizResult />} />
            </Routes>
          </HashRouter>
        </AnsweredQuestionsContextProvider>
      </GameOptionContextProvider>
    </div>
  )
}

export default App
