import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { useDispatch } from 'react-redux';
import { addToCartActionCreator } from '../../reduxStore/cartState';
import Button from '@mui/material/Button';

export default function (props) {

    const {
        productId,
    } = props;

    const dispatch = useDispatch();

    const [ productState, setProductState ] = useState([])

    useEffect(() => {

        async function fetchProducts() {
            let productsResult = await AxiosBackend.get(
                'get-products',
            );

            setProductState(productsResult.data)
        }

        fetchProducts()
        
    }, [])
   
    if (productState.length > 1) {

        const product = productState.find(item => item._id === productId)
        
        //Image
        const imgObj = product.images.find(el => el.perspective === "front");
        const imageSizeObj = imgObj.sizes.find(el => el.size === "large");
        const image = imageSizeObj.url

        //Item price
        const itemsObj = product.items.find(el => el.price);
        const priceObj = itemsObj.price;
        const price = priceObj.regular

        //Item Brand
        const brand = product.brand;

        const handleAddToCart = () => {

            dispatch(addToCartActionCreator(
                productId,
                product.productId,
                brand,
                price,
                image,
                product.description
            ))
        }
   
        return (
            <Card sx={{ display: 'flex', maxWidth: 800, flexGrow: 1 }}>
                <Box display="flex" flexDirection="column" justifyContent="center">
                    <CardMedia
                        component="img"
                        sx={{ height: 80, maxWidth: 50, p: 1, mr: 6 }}
                        image={image}
                        alt="Live from space album cover"
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}  >
                    <Box pt={2} mb={1}>
                        <Typography fontWeight="bold">{brand} </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}  >
                        <Box mb={1}>
                            <Typography fontWeight="bold">${price}</Typography>
                        </Box>
                    </Box>
                    <Box mb={3} pr={3}>
                        <Button variant="contained" size="small" onClick={handleAddToCart}>Add to cart</Button>
                    </Box>
                </Box>
            </Card >
        )

    } else {
            
        return (
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "Center",
                    marginTop: 70
                }}
            >
                <Typography
                    variant="h4"
                    style={{
                        fontFamily: "'Fredoka One', cursive",
                        textAlign: "center",
                        textShadow: "5px 5px 5px #19d2ff"
                    }}
                >
                    Loading...
                </Typography>
            </Box >
        );
    };
}
