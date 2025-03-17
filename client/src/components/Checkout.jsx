import {loadStripe} from '@stripe/stripe-js'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { useCallback } from 'react'


const stripePromise = loadStripe('pk_test_51R0ALmId7om5ef7SdTG0uAeU76deYhRnK8tECp0ulQJZE4OmDhutH59HVe1NLMQJWxnLHckaHZB4wJPQgyJYbGp6003H0055NG')

const Checkout = ({ currentUser }) => {

    const cart_id = currentUser?.carts[0].id



    const fetchClientSecret = useCallback(async () => {
        const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cart_id })
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