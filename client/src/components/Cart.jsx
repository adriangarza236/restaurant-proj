import { useEffect } from "react";
import React from "react"
import CartFoodCards from "./CartFoodCards"


function Cart({ cartFoods, currentUser, loggedIn, deleteCartFood, updateCart }) {

    //filtering through cartFoods to get the cartFoods that belong to currentUser
    const filteredCartFoods = cartFoods.filter(cartFood => cartFood.cart.user_id === currentUser.id);

    //passing cartFood info to indiviual cards
    const cartFoodCards = filteredCartFoods.map((cartFood) => <CartFoodCards key={cartFood.id} cartFood={cartFood} deleteCartFood={deleteCartFood} />)

    //grabbing all the prices from cartFoods
    const prices = filteredCartFoods.map((cartFood) => cartFood.food.price)
    
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
        
    return(
        <div>
            <h1>Cart</h1>
            {loggedIn ? cartFoodCards : <p>Loading...</p>}
            <h3>Total: {filteredCartFoods.length > 0 ? total : 0}</h3>
        </div>
    )
}

export default Cart