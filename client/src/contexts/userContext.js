import { createContext, useReducer } from "react"

export const UserContext = createContext()

export const userReducer = (currentUser, action) => {
    switch(action.type) {
        case 'SET_USERNAME':
            return {
                username: action.payload,
                accessToken: currentUser.accessToken
            }
        case 'SET_ACCESSTOKEN':
            return {
                username: currentUser.username,
                accessToken: action.payload
            }
        default:
            return currentUser
    }
}

export const UserContextProvider = ({ children }) => {
    const [currentUser, dispatch] = useReducer(userReducer, {
        username: null,
        accessToken: null
    })

    return(
        <UserContext.Provider value={{...currentUser, dispatch}}>
            { children }   
        </UserContext.Provider>
    )
}