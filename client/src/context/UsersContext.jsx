import { createContext, useEffect, useState } from "react"

const UsersContext = createContext({})

const UsersProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    //Checking Current User
    useEffect(() => {
    async function checkCurrentUser() {
        const resp = await fetch("/api/check_current_user")
        if (resp.status === 200) {
        const data = await resp.json()
        login_user(data)
        }
    }
    
    checkCurrentUser()
    }, [])

    //Login
    const login_user = user => {
        setCurrentUser(user)
        setLoggedIn(true)
    }

    //Logout
    const logout_user = () => {
        setCurrentUser(null)
        setLoggedIn(false)
    }

    return <UsersContext.Provider value={{ currentUser, setCurrentUser, loggedIn, login_user, logout_user }}>{children}</UsersContext.Provider>
    
}
export { UsersContext, UsersProvider }