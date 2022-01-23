import { useState, useEffect } from 'react'
import axios from 'axios'


const useFetchData = (link) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(link)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return { data, isLoading }
}

export default useFetchData
