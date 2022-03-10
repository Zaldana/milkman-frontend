import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import NaturalProduct from '../cards/NaturalProduct'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

function NaturalMilk() {

    const productState = useSelector(state => state.products);
    let filteredProductState = productState.filter(item =>
        item.description.includes("Milk") &&
        !item.description.includes("creamer") &&
        !item.description.includes("Lactose") &&
        !item.description.includes("Almond") &&
        !item.description.includes("Soy") &&
        !item.description.includes("Coconut") &&
        !item.description.includes("Chocolate") 
    );

    return (
        <Layout>
            <Box p={4}>
                {
                    filteredProductState.length > 1 ? (

                        filteredProductState.map((product, i) => (
                            <Box
                                key={i}
                                mb={4}
                                display="flex"
                                alignItems="center"
                            >
                                <NaturalProduct
                                    product={product}
                                />
                            </Box>
                        ))

                    ) : (
                        <Typography>Loading</Typography>
                    )
                }
            
            </Box>
        </Layout>
    )
}

export default NaturalMilk