import {loadStripe} from '@stripe/stripe-js'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { useCallback, useContext } from 'react'
import { UsersContext } from '../context/UsersContext'


const stripePromise = loadStripe('pk_test_51R4V03RKH3DomtL4ocoPofbw86GVDd1KO4lnZofWmZ7t2CeFmougMNkBHlIwQPjT2HoQUW0XyQI5G0Ktcbev5sEF00RI8qLPM8')

const Checkout = () => {

    const { currentUser } = useContext(UsersContext)

    //grabbing cart id if current user exists
    const cart_id = currentUser.id
    
    //Creating a checkout session
    const fetchClientSecret = useCallback(async () => {
        const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                cart_id,
                currentUser: {
                    email: currentUser.email,
                    id: currentUser.id
                }
            })
        })
        const data = await response.json()
        return data.clientSecret
    }, [cart_id])

    const options = {fetchClientSecret}


    return(
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default Checkout