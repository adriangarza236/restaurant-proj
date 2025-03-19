import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CheckoutLoading = () => {

    //Get the Url because it stores the session id
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    //use  get to isolate the session id
    const sessionId = queryParams.get('session_id')
    
    //define navigate
    const navigate = useNavigate()

    //once session id is grabbed, navigate to paths regarding payment status
    useEffect(() => {
        if (sessionId) {
            fetch(`/api/session-status?session_id=${sessionId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'complete') {
                    navigate('/success-pay')
                } else if (data.status === 'open') {
                    navigate('/failed-pay')
                }
        })
        }

    }, [sessionId])
        


    return(
        <div>
            <h1>Payment in Progress...</h1>
        </div>

    )
}

export default CheckoutLoading