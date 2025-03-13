import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = ({ loggedIn, logout_user }) => {
    //define navigate
    const navigate = useNavigate()

    //handle logging out via navbar
    const handleClick = event => {
        event.preventDefault()

        fetch("/api/logout",
            {method: "DELETE"})
            .then(resp => logout_user())
            navigate('/')
    }

    return (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            {loggedIn ? (
            <>
                <li><Link to="#" onClick={handleClick}>Logout</Link></li>
                <li><Link to="/cart">Cart</Link></li>
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