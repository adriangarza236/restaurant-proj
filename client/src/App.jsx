import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Signup from './components/Signup'
import Login from './components/Login'
import Checkout from './components/Checkout'
import CheckoutLoading from './CheckoutLoading'
import SuccessPay from './SuccessPay'
import FailedPay from './FailedPay'


function App() {
  //State
  const [foods, setFoods] = useState([])
  const [users, setUsers] = useState([])
  const [cartFoods, setCartFoods] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [carts, setCarts] = useState(0)
  const [cartStatus, setCartStatus] = useState("")



  //Getting Food For Menu
  useEffect(() => {
    fetch("/api/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data))
  }, [])

  //Getting CartFoods
  useEffect(() => {
    fetch("/api/cart_foods")
      .then((response) => response.json())
      .then((data) => setCartFoods(data))
  }, [])

  //Getting Cart
  if (currentUser){
    useEffect(() => {
      fetch("/api/carts")
        .then((response) => response.json())
        .then((data) => setCarts(data))
    }, [])
  }


  //Checking Current User
  useEffect(() => {
    async function check_current_user() {
      const resp = await fetch("/api/check_current_user")
      if(resp.status === 200) {
        const data = await resp.json()
        login_user(data)
      }
    }

    check_current_user()

    
  }, [loggedIn])
  
  //Add Food to Cart
  const addCartFood = (data) => {
    const updatedFood = [...cartFoods, data]
    setCartFoods(updatedFood)
  }

  //Delete CartFood
  const deleteCartFood = (cartFood) =>  {
      const updatedCartFoods = cartFoods.filter(cf => cf.id != cartFood.id)
      setCartFoods(updatedCartFoods)
  }

  const deleteAllCartFood = () => {
    const updatedCartFoods = cartFoods.filter(cartFood => cartFood.cart.user_id !== currentUser.id)
    setCartFoods(updatedCartFoods)
  }

  const updateCart = (data) => {
    const updatedCart = [...carts, data]
    setCarts(updatedCart)
  }
  //Login
  const login_user = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  //Logout
  const logout_user = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

 
  return (
    <>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logout_user={logout_user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu foods={foods} loggedIn={loggedIn} addCartFood={addCartFood} currentUser={currentUser} />} />
        <Route path="/cart" element={<Cart cartFoods={cartFoods} currentUser={currentUser} updateCart={updateCart} deleteCartFood={deleteCartFood} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup login_user={login_user} loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login login_user={login_user} loggedIn={loggedIn} />} />
        <Route path="/checkout" element={<Checkout currentUser={currentUser}/>} />
        <Route path="/checkout-loading" element={<CheckoutLoading />} />
        <Route path="/success-pay" element={<SuccessPay deleteAllCartFood={deleteAllCartFood} cartFoods={cartFoods} currentUser={currentUser}/>} />
        <Route path="/failed-pay" element={<FailedPay />} />
      </Routes>
    </>
  )
}

export default App
