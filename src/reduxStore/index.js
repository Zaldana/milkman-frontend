import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from './productState'

const store = configureStore({
    // preloadedState: JSON.parse(window.localStorage.getItem('applicationState')) || {},
    reducer: {
        products: productsReducer,
    },
})

// function handleOnChange() {
//     const newState = store.getState();
//     window.localStorage.setItem('applicationState', JSON.stringify(newState));
// }

// store.subscribe(handleOnChange)

export default store;