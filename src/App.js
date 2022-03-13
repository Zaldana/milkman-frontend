import React from "react";
import { Provider } from 'react-redux'
import store from "./reduxStore";
import HomePage from './components/pages/HomePage';
import ChocolateMilk from "./components/pages/ChocolateMilk";
import CoffeeCreamer from "./components/pages/CoffeeCreamer";
import ShoppingCart from "./components/pages/ShoppingCart";
import LactoseFree from "./components/pages/LactoseFree";
import NaturalMilk from "./components/pages/NaturalMilk";
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"
import UserPage from "./components/pages/UserPage";
import AdminPage from "./components/pages/AdminPage";
import ProductDisplay from "./components/pages/ProductDisplay";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="product-display" element={<ProductDisplay />} />
            <Route path="chocolate-milk" element={<ChocolateMilk />} />
            <Route path="coffee-creamer" element={<CoffeeCreamer />} />
            <Route path="lactose-free" element={<LactoseFree />} />
            <Route path="natural-milk" element={<NaturalMilk />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="user" element={<UserPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route index element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;