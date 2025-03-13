import React from "react"
import FoodCards from "./FoodCards"

function Menu({ foods, loggedIn, addCartFood, currentUser }) {
    
    const foodCards = foods.map((food) => <FoodCards key={food.id} food={food} loggedIn={loggedIn} currentUser={currentUser} addCartFood={addCartFood}/>)
    
    return(
        <>
           <h1>Menu</h1>
           {foodCards}
        </>
    )
}

export default Menu