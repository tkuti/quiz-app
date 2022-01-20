import './App.css'
import Welcome from './pages/Welcome'
import Quiz from './pages/Quiz'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { GameOptionContextProvider } from './context/GameOptionsContext'

function App() {
  return (
    <div className='App'>
      <GameOptionContextProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/quiz' element={<Quiz />} />
          </Routes>
        </HashRouter>
      </GameOptionContextProvider>
    </div>
  )
}

export default App
