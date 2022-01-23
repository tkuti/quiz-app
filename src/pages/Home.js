import React, { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import { useNavigate } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import quizImage from '../images/quiz-header.jpg'

const Home = () => {
  const { setLink,gameOptions, setGameOptions } = useContext(QuizContext)
  const { data: categories } = useFetchData('https://opentdb.com/api_category.php')
  let navigate = useNavigate()


  const handleOptionChange = e => {
    if (e.target.name === 'category') {
      let categoryName
      if (e.target.value !== '0') {
        categoryName = categories['trivia_categories'].find(
          cat => cat.id === Number(e.target.value)
        ).name
      } else {
        categoryName = 'Random'
      }
      setGameOptions({
        ...gameOptions,
        [e.target.name]: e.target.value,
        categoryName
      })
    } else {
      setGameOptions({ ...gameOptions, [e.target.name]: e.target.value })
    }
  }

  const startQuiz = () => {
    let newLink = 'https://opentdb.com/api.php?amount=10'
    if (gameOptions.category !== '0') {
      newLink += `&category=${gameOptions.category}`
    }
    if (gameOptions.difficulty !== 'random') {
      newLink += `&difficulty=${gameOptions.difficulty}`
    }
    setLink(newLink)
    navigate('/quiz')
  }

  return (
    <div className='home'>
      <header className='header'>
        <img src={quizImage} alt="quiz-time" />
        <h2>Welcome Stranger!</h2>
        <p>Are you ready for a quiz?</p>
        <p>Pick category and difficulty and start right now.</p>
      </header>
      <div className='game-options'>
        <div className='category-options select-wrapper'>
          <label htmlFor='select-categories'>Category: </label>
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
        <div className='difficulty-options select-wrapper'>
          <label htmlFor='select-difficulties'>Difficulty: </label>
          <select
            name='difficulty'
            id='select-difficulties'
            onChange={handleOptionChange}
          >
            <option value='random'>Random</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <button className='rainbow-button'
        value='Start quiz'
        onClick={startQuiz}></button>
      </div>
    </div>
  )
}

export default Home
