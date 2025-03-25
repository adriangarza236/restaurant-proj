import { useContext, useEffect } from "react";
import React from "react"
import CartFoodCards from "./CartFoodCards"
import { useNavigate } from "react-router-dom";
import { CartsContext } from "../context/CartsContext";
import { UsersContext } from "../context/UsersContext";
import { CartFoodsContext } from "../context/CartFoodsContext";

const Cart = () => {

    
    //define navigate 
    const navigate = useNavigate()
    
    const { updateCart } = useContext(CartsContext)
    const { currentUser, loggedIn } = useContext(UsersContext)
    const { cartFoods, updateCartFood } = useContext(CartFoodsContext)
    
    //filtering through cartFoods to get the cartFoods that belong to currentUser
    const filteredCartFoods = cartFoods.filter(cartFood => cartFood.cart && currentUser && cartFood.cart.user_id === currentUser.id)  
    //updating quantities in the backend
    const updateQuantities = (groupedCartFoods) => {
        if (groupedCartFoods.length > 0) {
            groupedCartFoods.forEach(cartFood => {
                updateCartFood(cartFood)
            })
        }
    }

    //grouping by id and summing quantities if already in cart
    const groupedCartFoods = filteredCartFoods.reduce((accumulator, cartFood) => {
        const existingCartFood = accumulator.find(item => item.food_id === cartFood.food_id)
        if (existingCartFood) {
            existingCartFood.quantity += 1
        } else {
            accumulator.push({ ...cartFood })
        }
        return accumulator
    }, [])
    

    
    
    //passing cartFood info to indiviual cards
    const cartFoodCards = groupedCartFoods.map((cartFood) => <CartFoodCards key={cartFood.food_id} cartFood={cartFood} />)
    
    //grabbing all the prices from cartFoods
    const prices = filteredCartFoods.map((cartFood) => cartFood.food.price * cartFood.quantity)
    

    //function to add prices
    function addPrices(array) {
        let sum = 0
        for (let i = 0; i < array.length; i++) {
            sum += array[i]
        }
        return sum
    }

    //defining total from sum of prices
    const total = addPrices(prices)
    
    //updating cart to show correct total
    useEffect(() => {
        if (filteredCartFoods.length > 0) {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "total_price": total
                })
            }
            fetch("/api/cart/" + filteredCartFoods[0].cart_id, options)
                .then(resp => resp.json())
                .then(data => {
                    updateCart(data)
                })
        }
    }, [total])

    //navigate to checkout embedded form
    const handleCheckout = (e) => {
        e.preventDefault()
        navigate("/checkout")
    }
        

    return(
        <div>
            <h1>Cart</h1>
            {loggedIn ? cartFoodCards : <p>Loading...</p>}
            <h3>Total: {filteredCartFoods.length > 0 ? total : 0}</h3>
            {total > 0 ? <button onClick={handleCheckout}>Checkout</button> : null}
        </div>
    )
}

export default Cart