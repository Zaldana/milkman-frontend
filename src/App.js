import React from "react";
import { Provider } from 'react-redux'
import store from "./reduxStore";
import HomePage from './components/pages/HomePage';
import ChocolateMilk from "./components/pages/ChocolateMilk";
import CoffeeCreamer from "./components/pages/CoffeeCreamer";
import ShoppingCart from "./components/pages/ShoppingCart";
import LactoseFree from "./components/pages/LactoseFree";
import NaturalMilk from "./components/pages/NaturalMilk";
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
            <Route index element={<HomePage />} />
            <Route path="chocolate-milk" element={<ChocolateMilk />} />
            <Route path="coffee-creamer" element={<CoffeeCreamer />} />
            <Route path="lactose-free" element={<LactoseFree />} />
            <Route path="natural-milk" element={<NaturalMilk />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;