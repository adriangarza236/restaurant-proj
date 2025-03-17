import { useEffect } from "react"

const SuccessPay = ({ currentUser, cartFoods, deleteAllCartFood }) => {
    //filtering through cartFoods to get the cartFoods that belong to currentUser
    const filteredCartFoods = cartFoods.filter(cartFood => cartFood.cart.user_id === currentUser.id)
    console.log(filteredCartFoods)
    
    useEffect(() => {
        deleteAllCartFood(filteredCartFoods)
    }, [])
    

    return (
        <h1>Successfully Completed Order</h1>
    )
}
export default SuccessPay