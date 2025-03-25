import { createContext, useState, useEffect, useContext } from "react"
import { UsersContext } from "./UsersContext"

const CartsContext  = createContext({})

const CartsProvider = ({ children }) => {

    //state
    const [carts, setCarts] = useState([])

    //context
    const { currentUser } = useContext(UsersContext)

    //Getting Cart 
    useEffect(() => {
        if (currentUser) {
        fetch("/api/carts")
            .then((response) => response.json())
            .then((data) => setCarts(data))
        }
    }, [currentUser])

    //Create a cart for new user
    const createCart = (userId) => {
        const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "total_price": 0,
            "user_id": userId
        })
        }
        fetch('/api/carts', options)
        .then(resp => resp.json())
        .then(data => {
            setCarts(data)
        })
    }

    //update total price in cart
    const updateCart = (data) => {
        const updatedCart = [...carts, data]
        setCarts(updatedCart)
    }

    return <CartsContext.Provider value={{createCart, updateCart}}>{children}</CartsContext.Provider>

}
export { CartsContext, CartsProvider }