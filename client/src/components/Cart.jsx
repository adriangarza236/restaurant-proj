import React from "react"
import CartFoodCards from "./CartFoodCards"

function Cart({ cartFoods, currentUser, loggedIn, deleteCartFood }) {

    const filteredCartFoods = cartFoods.filter(cartFood => cartFood.cart.user_id === currentUser.id);
    const cartFoodCards = filteredCartFoods.map((cartFood) => <CartFoodCards key={cartFood.id} cartFood={cartFood} deleteCartFood={deleteCartFood} />)
    return(
        <div>
            <h1>Cart</h1>
            {loggedIn ? cartFoodCards : <p>Loading...</p>}
            <h3>Total: {filteredCartFoods.length > 0 ? filteredCartFoods[0].cart.total_price : 0}</h3>
        </div>
    )
}

export default Cart