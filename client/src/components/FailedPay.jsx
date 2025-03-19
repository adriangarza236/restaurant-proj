import { useNavigate } from "react-router-dom"

const FailedPay = () => {
    //define navigate
    const navigate = useNavigate()

    //redirect to cart, to attemp payment again
    const handleClick = (e) => {
        e.preventDefault()
        navigate('/cart')
        
    }

    return(
        <>
            <h1>Payment Failed</h1>
            <button type="button" onClick={handleClick}>Retry</button>
        </>
    )
}
export default FailedPay