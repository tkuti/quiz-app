import {useReducer, createContext} from 'react'

export const AnsweredQuestionsContext = createContext()

export const AnsweredQuestionsContextProvider = (props) => {
    const [answeredQuestions, dispatchAnsweredQuestion] = useReducer(
        (state, action) => {
        switch (action.type) {
            case 'ADD':
                return [...state, action.payload]
            default:
                return state
        }
    }, [])

    return (
        <AnsweredQuestionsContext.Provider value={{answeredQuestions, dispatchAnsweredQuestion}}>
            {props.children}
        </AnsweredQuestionsContext.Provider>
    )
}