import {useState, createContext} from 'react'

export const GameOptionContext = createContext()

export const GameOptionContextProvider = (props) => {
    const [link, setLink] = useState('https://opentdb.com/api_category.php')


    return (
        <GameOptionContext.Provider value={{link, setLink}}>
            {props.children}
        </GameOptionContext.Provider>
    )
}