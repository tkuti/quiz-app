import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GameOptionContext } from '../context/GameOptionsContext'

const useFetchData = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {link} = useContext(GameOptionContext)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(link)
      console.log(response)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return { data, isLoading, fetchData }
}

export default useFetchData
