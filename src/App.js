import React from "react";
import { Provider } from 'react-redux'
import store from "./reduxStore";
import HomePage from './components/pages/HomePage';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import ChocolateMilk from "./components/pages/ChocolateMilk";
import CoffeeCreamer from "./components/pages/CoffeeCreamer";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="chocolate-milk" element={<ChocolateMilk />} />
            <Route path="coffee-creamer" element={<CoffeeCreamer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;