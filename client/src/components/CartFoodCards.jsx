import React, { useContext } from "react"
import { CartFoodsContext } from "../context/CartFoodsContext"

function CartFoodCards({ cartFood }) {

    const { deleteCartFood } = useContext(CartFoodsContext)

    //remove cartFood from db
    const handleRemove = (e, cartFood) => {
        e.preventDefault()
        if (cartFood) {
            fetch("/api/cart_food/" + cartFood.id, { method: "DELETE"})
            deleteCartFood(cartFood)
        }
    }
    
    return (
        <>
            <img src={cartFood.food.image} alt="Food Image" />
            <h2>{cartFood.food.name}</h2>
            <h2>{cartFood.food.price}</h2>
            <button onClick={(e) => handleRemove(e, cartFood)}>Remove from Cart</button>
        </>
    )
}

export default CartFoodCards