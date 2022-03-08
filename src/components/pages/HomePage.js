import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useDispatch } from 'react-redux';
import { productsActionCreator } from '../../reduxStore/productState';
import axios from 'axios';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions, 
    Button
} from '@mui/material';

const HomePage = (props) => {
    
    const dispatch = useDispatch();

    useEffect(async () => {

        let productsResult = await axios.get(
            'http://localhost:3001/api/products/',
        );
        dispatch(productsActionCreator(productsResult.data.allProducts))
    }, [])

    return (
        <Layout>
            <Box p={4}>
                <Link to="/product-page">
                    <Button>
                    Products
                    </Button>
                </Link>
            </Box>
        </Layout>
    )
};

export default HomePage;