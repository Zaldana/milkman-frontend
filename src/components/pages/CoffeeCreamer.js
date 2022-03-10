import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import CreamerProduct from '../cards/CreamerProduct'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

function CoffeeCreamer() {

    const productState = useSelector(state => state.products);
    let filteredProductState = productState.filter(item => item.description.includes("Creamer"));

    return (
        <Layout>
            <Box p={4}>
                {
                    filteredProductState.map((product, i) => (
                        <Box
                            key={i}
                            mb={4}
                            display="flex"
                            alignItems="center"
                        >
                            <CreamerProduct
                                product={product}
                            />
                        </Box>
                    ))
                }
            </Box>
        </Layout>
    )
}

export default CoffeeCreamer