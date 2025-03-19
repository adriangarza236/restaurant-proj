import React, { useContext } from "react"
import FoodCards from "./FoodCards"
import { FoodsContext } from "../context/FoodsContext"
import { UsersContext } from "../context/UsersContext"


function Menu() {

    const { currentUser } = useContext(UsersContext)
    const { foods } = useContext(FoodsContext)
    
    //iterating through foods to make foodCards
    const foodCards = foods.map((food) => <FoodCards key={food.id} food={food} currentUser={currentUser}/>)
    
    return(
        <>
           <h1>Menu</h1>
           {foodCards}
        </>
    )
}

export default Menu