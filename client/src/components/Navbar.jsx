import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { UsersContext } from "../context/UsersContext"

const Navbar = () => {

    const { loggedIn, logout_user, currentUser } = useContext(UsersContext)
    
    //define navigate
    const navigate = useNavigate()

    //handle logging out via navbar
    const handleClick = event => {
        event.preventDefault()

        fetch("/api/logout",
            {method: "DELETE"})
            .then(() => logout_user())
            .then(() => navigate('/'))
    }

    return (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            {loggedIn ? (
            <>
                <li><Link to="#" onClick={handleClick}>Logout</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <h3>{currentUser.email} is logged in</h3>
            </>
        ) : (
            <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>
        )}
        </>
    )
}

export default Navbar