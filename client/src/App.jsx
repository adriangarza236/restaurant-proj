import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  //State
  const [foods, setFoods] = useState([])
  const [users, setUsers] = useState([])
  const [cartFoods, setCartFoods] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)


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
        <Route path="/cart" element={<Cart loggedIn={loggedIn} currentUser={currentUser} cartFoods={cartFoods}/>} />
        <Route path="/signup" element={<Signup login_user={login_user} loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login login_user={login_user} loggedIn={loggedIn} />} />
      </Routes>
    </>
  )
}

export default App
