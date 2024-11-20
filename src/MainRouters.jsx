import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import Food from "./pages/Food"
import Product from './pages/Product';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import ShoppingCart from './pages/ShoppingCart';
import FinishOrder from './pages/FinishOrder';
import Favourite from './pages/Favourite';
import PrivateRoute from './PrivateRoute';

const MainRouters = () => {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/finishOrder" element={<FinishOrder />} />
          <Route path="/favourite" element={<PrivateRoute Component={Favourite} />} />
          <Route path="*" element={<div><h2>404 Page not found</h2></div>} />
        </Routes>
      </Dashboard>
    </Router>
  )
}

export default MainRouters