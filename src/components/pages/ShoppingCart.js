import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyCartActionCreator } from '../../reduxStore/cartState';
import CartItem from '../cards/CartItem';
import Layout from '../layout/Layout';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { useNavigate } from "react-router-dom";

const ShoppingCart = (props) => {

    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const total = cart.reduce((acc, cartItem) => {
        return acc + (cartItem.price * cartItem.quantity);
    }, 0);

    const emptyShoppingCart = () => {
        dispatch(emptyCartActionCreator())
    }
   
    const handleCheckOut = async () => {
     
        let purchaseHistory = []
        const idArray = cart.map(item => item._id)
        purchaseHistory.push(idArray)
        
        try {

            let payload = await AxiosBackend.put(
                'edit-user/',
                {
                    userUpdateForm: {
                        shoppingHistory: purchaseHistory
                    }
                },
            )

            dispatch(emptyCartActionCreator())
            navigate('/')

        } catch (e) {

            console.log(e);

        }
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
                    <Button sx={{ width: '220px' }} variant="contained" onClick={handleCheckOut}>Checkout</Button>
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