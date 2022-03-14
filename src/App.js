import React from "react";
import { Provider } from 'react-redux'
import store from "./reduxStore";
import HomePage from './components/pages/HomePage';
import ShoppingCart from "./components/pages/ShoppingCart";
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"
import UserPage from "./components/pages/UserPage";
import AdminPage from "./components/pages/AdminPage";
import ProductDisplay from "./components/pages/ProductDisplay";
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="product-display"
              element={
                  <PrivateRoute>
                    <ProductDisplay />
                  </PrivateRoute>
                }
            />
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