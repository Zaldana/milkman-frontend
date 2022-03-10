import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions, 
    Button
} from '@mui/material';

const HomePage = (props) => {

    return (
        <Layout>
            <Box p={4}>
                <Link to="/chocolate-milk">
                    <Button>
                    Chocolate 
                    </Button>
                </Link>
                <Link to="/coffee-creamer">
                    <Button>
                        Coffee Creamer
                    </Button>
                </Link>
                <Link to="/lactose-free">
                    <Button>
                        Lactose Free & Plant Base Milk
                    </Button>
                </Link>
                <Link to="/natural-milk">
                    <Button>
                       Natural Milk
                    </Button>
                </Link>
            </Box>
        </Layout>
    )
};

export default HomePage;