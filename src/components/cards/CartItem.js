import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCartActionCreator } from '../../reduxStore/cartState';

const CartItem = (props) => {

    const {
        cartItem: {
            productId,
            brand,
            image,
            quantity,
            price,
            description
        } } = props;
    
    const dispatch = useDispatch();

    const removeItem = (productId) => {
        dispatch(removeFromCartActionCreator(productId))
    }

    return (
        <Card sx={{ display: 'flex' }}>
            <Box display="flex" flexDirection="column" justifyContent="center">
                <CardMedia
                    component="img"
                    sx={{ height: 80, maxWidth: 80, p: 2 }}
                    image={image}
                    alt="Live from space album cover"
                />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
                <Box mb={1}>
                    <Typography fontWeight="bold">${price} {brand} </Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
                <Box mb={1} px={2}>
                    <Typography fontWeight="bold">x {quantity}</Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
                <Box mb={1} px={2}>
                    <Typography fontWeight="bold">${(quantity * price).toFixed(2)}</Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
                <Box mb={1} px={2}>
                    <IconButton onClick={() => removeItem(productId)}>
                        <DeleteForeverIcon color="error" />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default CartItem;