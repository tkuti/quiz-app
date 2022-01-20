import {useState, useEffect, createContext} from 'react'

export const GameOptionContext = createContext()

export const GameOptionContextProvider = (props) => {
    const [gameOptions, setGameOptions] = useState({
        category: "random",
        difficulty: "random"
    })
    const [link, setLink] = useState(null)

    useEffect(() => {
        console.log(gameOptions)
        let newLink = 'https://quizapi.io/api/v1/questions?limit=10'
        if (gameOptions.category !== "random") {
            newLink += `&category=${gameOptions.category}`
        }
        if (gameOptions.difficulty !== "random") {
            newLink += `&difficulty=${gameOptions.difficulty}`
        }
        setLink(newLink)
    }, [gameOptions])

    return (
        <GameOptionContext.Provider value={{gameOptions, setGameOptions, link}}>
            {props.children}
        </GameOptionContext.Provider>
    )
}