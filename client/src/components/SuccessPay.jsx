import { useContext, useEffect } from "react"
import { UsersContext } from "../context/UsersContext"
import { CartFoodsContext } from "../context/CartFoodsContext"

const SuccessPay = () => {
    
    const { currentUser } = useContext(UsersContext)
    const { cartFoods, deleteAllCartFood } = useContext(CartFoodsContext)
    
    //passing filtered cartFoods to App to be removed from cart
    useEffect(() => {
        const userCartFoods = currentUser ? cartFoods.filter(cartFood => cartFood.cart.user_id === currentUser.id) : []

        if (userCartFoods.length > 0) {
            deleteAllCartFood(userCartFoods)
        }
    }, [currentUser, deleteAllCartFood, cartFoods])
    

    return (
        <h1>Successfully Completed Order</h1>
    )
}
export default SuccessPay