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
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { useNavigate } from "react-router-dom";
import { signInActionCreator } from '../../reduxStore/userState';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShoppingCart = (props) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const total = cart.reduce((acc, cartItem) => {
        return acc + (cartItem.price * cartItem.quantity);
    }, 0);

    const emptyShoppingCart = () => {
        dispatch(emptyCartActionCreator())
    }
   
    const handleCheckOut = async () => {
     
        if (user) {

            const idArray = cart.map(item => item._id)

            try {
         
                let payload = await AxiosBackend.put(
                    'checkout/',
                    {
                        id: idArray
                    },
                )
                    .then(response => {
                        dispatch(signInActionCreator(response.data.user))
                    })

                dispatch(emptyCartActionCreator())
                navigate('/')

            } catch (e) {
                console.log(e);
            }   
            
        } else {
          handleAlert()
        }
       
    }
    const [ open, setOpen ] = React.useState(false);
    const handleAlert = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Layout>
            <Box fullwidth p={4}>
                {cart.map(item => (
                    <Box mb={4} key={item.productId} sx={{ display: "flex", justifyContent: "center"}}>
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
                <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%', display: "flex", justifyContent: "center"}}>
                        Please Log-in Before Checkout
                    </Alert>
                </Snackbar>
            </Box>
        </Layout>
    )
};

export default ShoppingCart;