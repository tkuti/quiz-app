import React, { useState, useEffect } from 'react'

const Timer = ({quizOver}) => {
  const [time, setTime] = useState()

  let timer

  useEffect(() => {
    startTime()
    return () => {
      clearInterval(timer)
    }
  }, [])


  const startTime = () => {
    let seconds = 1
    let minutes = 1
    timer = setInterval(() => {
      seconds--
      if (seconds < 0) {
        minutes--
        seconds = 59
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      let clockFace = minutes + ':' + seconds
      setTime(clockFace)
      if (clockFace === '0:00') {
        quizOver()
      }
    }, 1000)
  }


  return <div className='timer'>{time}</div>
}

export default Timer
