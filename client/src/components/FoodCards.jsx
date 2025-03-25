import React, { useContext } from "react"
import { UsersContext } from "../context/UsersContext"
import { CartFoodsContext } from "../context/CartFoodsContext"

const FoodCards = ({ food, currentUser }) => {

    const { loggedIn } = useContext(UsersContext)
    const { addToCart, updateCartFood, cartFoods } = useContext(CartFoodsContext)
    
    // const existingCartFood = cartFoods.find(cartFood => cartFood.food_id === food.id && cartFood.cart_id === currentUser.id)
    const existingCartFood = currentUser 
    ? cartFoods.find(cartFood => cartFood.food_id === food.id && cartFood.cart_id === currentUser.id)
    : null;
    // create a CartFood by using selected food
    const handleAddFood = (e) => {
        e.preventDefault()
        

        if (existingCartFood) {
            // Update the quantity of the existing cartFood
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "quantity": existingCartFood.quantity + 1
                })
            }

            fetch(`/api/cart_food/${existingCartFood.id}`, options)
                .then(resp => resp.json())
                .then(data => {
                    updateCartFood(data)
                })
        } else {
            // Create a new cartFood
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "food_id": food.id,
                    "cart_id": currentUser.id,
                    "quantity": 1
                })
            }

            fetch("/api/cart_foods", options)
                .then(resp => resp.json())
                .then(data => {
                    addToCart(data)
                })
        }
    }

    return(
        <div>
            <h2>{food.name}</h2>
            <h4>{food.price}</h4>
            <img src={food.image} alt={food.name} />
            {loggedIn ? <button onClick={handleAddFood}>
                {existingCartFood ? `In Cart (${existingCartFood.quantity})` : 'Add to Cart'}</button> : null}
        </div>
    )
}

export default FoodCards