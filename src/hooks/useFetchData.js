import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GameOptionContext } from '../context/GameOptionsContext'

const useFetchData = () => {
  const [questions, setQuestions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {link} = useContext(GameOptionContext)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    setIsLoading(true)
    const headers = {
      headers: {
        'X-Api-Key': 'XtH70vAbXCwOlQt4ZpSzKMHeAQLfhqJ4jAz1tEOZ'
      }
    }

    try {
      console.log(link)
      const response = await axios.get(
        link,
        headers
      )
      console.log(response)
      setQuestions(response.data)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return { questions, isLoading, fetchQuestions }
}

export default useFetchData
