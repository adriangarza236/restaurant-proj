import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { FoodsProvider } from './context/FoodsContext.jsx'
import { CartsProvider } from './context/CartsContext.jsx'
import { UsersProvider } from './context/UsersContext.jsx'
import { CartFoodsProvider } from './context/CartFoodsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodsProvider>
      <UsersProvider>
        <CartsProvider>
          <CartFoodsProvider>
            <Router>
              <App />
            </Router>
          </CartFoodsProvider>
        </CartsProvider>
      </UsersProvider>
    </FoodsProvider>
  </StrictMode>,
)
