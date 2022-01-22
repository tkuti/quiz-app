export const shuffleArray = array => {
  let shuffledArray = [...array]
  let currentIndex = shuffledArray.length
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex]
    ]
  }

  return shuffledArray
}
