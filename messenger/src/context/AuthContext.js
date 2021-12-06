import { createContext, useEffect, useReducer, useState } from "react"
import AuthReducer from "./AuthReducers";
const initial_state = {
    user: JSON.parse(localStorage.getItem('user_login')) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(initial_state)
export const ChatContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_state);
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)

    useEffect(() => {
        localStorage.setItem("user_login", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,

            }}
        >
            <ChatContext.Provider value={{
                currentChat, setCurrentChat, onlineUsers, setOnlineUsers
            }}>
                {children}
            </ChatContext.Provider>
        </AuthContext.Provider>
    );
}