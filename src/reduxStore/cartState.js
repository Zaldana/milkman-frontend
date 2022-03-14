import { SIGN_OUT_ACTION } from "./userState";

const shoppingCartInitialState = [];
const ADD_ITEM_TO_CART_ACTION = 'milkman.com/addItemToCart';
const REMOVE_ITEM_FROM_CART_ACTION = 'milkman.com/removeItemFromCart';
const EMPTY_CART_ACTION = 'milkman.com/emptyCart';

export const shoppingCartReducer = (state = shoppingCartInitialState, action) => {

    if (action.type === SIGN_OUT_ACTION) {
        return shoppingCartInitialState;
    }

    if (action.type === ADD_ITEM_TO_CART_ACTION) {

        const itemFoundInCart = state.find(cartItem => cartItem.productId === action.cartItem.productId);

        if (!itemFoundInCart) {
            return [ ...state, { ...action.cartItem, quantity: 1 } ];
        }

        const cartWithFoundItemRemoved = state.filter(item => item.productId !== action.cartItem.productId);

        return [ ...cartWithFoundItemRemoved, { ...action.cartItem, quantity: itemFoundInCart.quantity + 1 } ]
    }

    if (action.type === REMOVE_ITEM_FROM_CART_ACTION) {
        return state.filter(item => item.productId !== action.productId)
    }

    if (action.type === EMPTY_CART_ACTION) {
        return shoppingCartInitialState;
    }
 
    return state;
};

export const addToCartActionCreator = (
    mongoId,
    productId,
    brand,
    price,
    image,
    description
) => (dispatch) => {

    dispatch({
        type: ADD_ITEM_TO_CART_ACTION,
        cartItem: {
            _id: mongoId,
            productId: productId,
            brand: brand,
            price: price,
            image: image,
            description: description
        }
    })
};

export const emptyCartActionCreator = () => ({ type: EMPTY_CART_ACTION })

export const removeFromCartActionCreator = (id) => {
    return {
        type: REMOVE_ITEM_FROM_CART_ACTION,
        productId: id,
    }
}

