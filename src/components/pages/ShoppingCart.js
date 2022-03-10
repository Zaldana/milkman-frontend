import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyCartActionCreator } from '../../reduxStore/cartState';
import CartItem from '../cards/CartItem';
import Layout from '../layout/Layout';

const ShoppingCart = (props) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const total = cart.reduce((acc, cartItem) => {
        return acc + (cartItem.price * cartItem.quantity);
    }, 0);
    
    const emptyShoppingCart = () => {
        dispatch(emptyCartActionCreator())
    }

    return (
        <Layout>
            <Box p={4}>
                {cart.map(item => (
                    <Box mb={4} key={item.productId}>
                        <CartItem
                            
                            cartItem={{
                                productId: item.productId,
                                brand: item.brand,
                                image: item.image,
                                quantity: item.quantity,
                                price: item.price,
                            }}
                        />
                    </Box>
                ))}
                <Box display="flex" justifyContent="center" mb={2}>
                    <Typography>Total: ${total.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="center" mb={2}>
                    <Button sx={{ width: '220px' }} variant="contained">Checkout</Button>
                </Box>
                <Box display="flex" justifyContent="center" mb={2}>
                    <Button sx={{ width: '220px' }} startIcon={<ReplayIcon />} variant="contained" onClick={emptyShoppingCart}>Empty cart</Button>
                </Box>
                <Box display="flex" justifyContent="center" mb={2}>
                    <Link to="/">
                        <Button sx={{ width: '220px' }} startIcon={<HomeIcon />} variant="contained">Back to home page</Button>
                    </Link>
                </Box>
            </Box>
        </Layout>
    )
};

export default ShoppingCart;