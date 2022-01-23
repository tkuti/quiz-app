import './styles/main.scss'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { QuizContextProvider } from './context/QuizContext'

function App() {
  return (
    <div className='App'>
      <QuizContextProvider>
            <HashRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/quiz-result' element={<QuizResult />} />
              </Routes>
            </HashRouter>
      </QuizContextProvider>
    </div>
  )
}

export default App
