import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Signup from './components/Signup'
import Login from './components/Login'
import Checkout from './components/Checkout'
import CheckoutLoading from './components/CheckoutLoading'
import SuccessPay from './components/SuccessPay'
import FailedPay from './components/FailedPay'



function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-loading" element={<CheckoutLoading />} />
        <Route path="/success-pay" element={<SuccessPay />} />
        <Route path="/failed-pay" element={<FailedPay />} />
      </Routes>
    </>
  )
}

export default App
