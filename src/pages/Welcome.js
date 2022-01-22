import React, { useState,  useContext } from 'react'
import { GameOptionContext } from '../context/GameOptionsContext'
import { useNavigate } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'

const Welcome = () => {
  const { setLink } = useContext(GameOptionContext)
  const { data: categories } = useFetchData()
  const [gameOptions, setGameOptions] = useState({
    category: 0,
    difficulty: 0
  })
  let navigate = useNavigate()


  const handleOptionChange = e => {
    setGameOptions({ ...gameOptions, [e.target.name]: e.target.value })
  }

  const startQuiz = () => {
    let newLink = 'https://opentdb.com/api.php?amount=10'
    if (gameOptions.category !== '0') {
      newLink += `&category=${gameOptions.category}`
    }
    if (gameOptions.difficulty !== '0') {
      newLink += `&difficulty=${gameOptions.difficulty}`
    }
    setLink(newLink)
    navigate('/quiz')
  }

  return (
    <div>
      <div className='header'>
        <h1>Quiz Game</h1>
        <h2>Welcome Stranger!</h2>
        <p>Blablabla</p>
      </div>
      <div className='game-options'>
        <div className='category-options'>
          <label htmlFor='select-categories'>Pick a category: </label>
          <select
            name='category'
            id='select-categories'
            onChange={handleOptionChange}
          >
            <option value='0'>Random</option>
            {categories &&
              categories['trivia_categories'].map(category => (
                <option key={category.name} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className='difficulty-options'>
          <label htmlFor='select-difficulties'>Pick a difficulty: </label>
          <select
            name='difficulty'
            id='select-difficulties'
            onChange={handleOptionChange}
          >
            <option value='0'>Random</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <button onClick={startQuiz}>Start quiz</button>
      </div>
    </div>
  )
}

export default Welcome
