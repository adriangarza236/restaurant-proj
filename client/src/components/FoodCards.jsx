import React, { useContext } from "react"
import { UsersContext } from "../context/UsersContext"
import { CartFoodsContext } from "../context/CartFoodsContext"


function FoodCards({ food, currentUser }) {

    const { loggedIn } = useContext(UsersContext)
    const { addCartFood } = useContext(CartFoodsContext)

    // create a CartFood by using selected food
    const handleAddFood = (e) => {
        e.preventDefault()
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                "food_id": food.id,
                "cart": currentUser.carts,
                "cart_id": currentUser.carts[0].id 
            })
        }

        fetch("/api/cart_foods", options)
            .then(resp => resp.json())
            .then(data => {
                addCartFood(data)
            })
    }

    return(
        <div>
            <h2>{food.name}</h2>
            <h4>{food.price}</h4>
            <img src={food.image} alt={food.name} />
            {loggedIn ? <button onClick={handleAddFood}>Add to Cart</button> : null}
        </div>
    )
}

export default FoodCards