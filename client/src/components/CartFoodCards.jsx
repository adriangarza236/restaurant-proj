import React from "react"

function CartFoodCards({ cartFood, currentUser }) {


    
    return (
        <>
            <img src={cartFood.food.image} alt="Food Image" />
            <h2>{cartFood.food.name}</h2>
            <h2>{cartFood.food.price}</h2>
        </>
    )
}

export default CartFoodCards