import React, {useContext} from 'react'
import { GameOptionContext } from '../context/GameOptionsContext'
import { Link } from 'react-router-dom'

const Welcome = () => {

  const {gameOptions, setGameOptions} = useContext(GameOptionContext)

  const handleOptionChange = (e) => {
    setGameOptions({...gameOptions, [e.target.name]: e.target.value})
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
          <label htmlFor="select-categories">Pick a category: </label>
          <select name="category" id="select-categories" 
          onChange={handleOptionChange}>
            <option value="random">Random</option>
            <option value="code">Code</option>
            <option value="linux">Linux</option>
            <option value="cms">CMS</option>
            <option value="docker">Docker</option>
            <option value="sql">SQL</option>
          </select>
        </div>
        <div className='difficulty-options'>
        <label htmlFor="select-difficulties">Pick a difficulty: </label>
          <select name="difficulty" id="select-difficulties" 
           onChange={handleOptionChange}>
            <option value="random">Random</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <Link to="quiz">Start quiz</Link>
      </div>
    </div>
  )
}

export default Welcome
