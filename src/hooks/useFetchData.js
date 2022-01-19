import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchData = () => {
  const [questions, setQuestions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
      const response = await axios.get(
        'https://quizapi.io/api/v1/questions?limit=10',
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
