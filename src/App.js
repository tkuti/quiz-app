import './styles/main.scss'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'
import MyResults from './pages/MyResults' 
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
                <Route path='/my-results' element={<MyResults />} />
              </Routes>
            </HashRouter>
      </QuizContextProvider>
    </div>
  )
}

export default App
