import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from "./UsersContext";


const CartFoodsContext = createContext({})

const CartFoodsProvider = ({ children }) => {
    
    const [cartFoods, setCartFoods] = useState([])
    const { currentUser } = useContext(UsersContext)

    //Getting CartFoods for Cart
    useEffect(() => {
        fetch("/api/cart_foods")
        .then((response) => response.json())
        .then((data) => setCartFoods(data))
    }, [])

    //Add Food to Cart
    const addCartFood = (data) => {
        const updatedFood = [...cartFoods, data]
        setCartFoods(updatedFood)
    }

    // Add Food to Cart
    const addToCart = (data) => {
        setCartFoods([...cartFoods, data])
    }


    // Update CartFood
    const updateCartFood = (data) => {
        console.log(data)
        const updatedCartFoods = cartFoods.map(cartFood => 
            cartFood.id === data.id ? { ...cartFood, ...data } : cartFood
        );

        setCartFoods(updatedCartFoods);
    }

    //Remove CartFood
    const deleteCartFood = (cartFood) => {
        const updatedCartFoods = cartFoods.filter(cf => cf.id != cartFood.id)
        setCartFoods(updatedCartFoods)
    }

    //Removes all cartFood from cart, when payment succeeds
    const deleteAllCartFood = (userCartFoods) => {
        userCartFoods.forEach(cartFood => {
        fetch(`/api/cart_food/${cartFood.id}`, { method: "DELETE" })
            .then(() => {
            setCartFoods(prevCartFoods => prevCartFoods.filter(cf => cf.id !== cartFood.id))
            })
        })
    }

    return <CartFoodsContext.Provider value={{cartFoods, updateCartFood, addToCart, addCartFood, deleteCartFood, deleteAllCartFood}}>{children}</CartFoodsContext.Provider>

}
export { CartFoodsContext, CartFoodsProvider }