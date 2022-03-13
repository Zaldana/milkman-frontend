const productsInitialState = [];

const GET_ALL_PRODUCTS_ACTION = 'milkman.com/products';

export const productsReducer = (state = productsInitialState, action) => {

    if (action.type === GET_ALL_PRODUCTS_ACTION) {
        
        return action.payload;
    }
    return state;
};

export const productsActionCreator = (products) => {

    return ({
        type: GET_ALL_PRODUCTS_ACTION,
        payload: products,
    })
};
