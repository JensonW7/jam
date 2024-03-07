import { UserContext } from "../contexts/userContext"
import { useContext } from "react"

export const useUserContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw Error('not in the correct provider')
    }

    return context
}