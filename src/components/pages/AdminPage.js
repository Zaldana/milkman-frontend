import { Box, Button, Card } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';

const AdminPage = () => {

    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    if (!user || !user.isAdmin) {
        navigate('/');
    }

    return (
        <Layout>
            <Box p={4}>
                <h1>Admin / control panel</h1>
                <Box maxWidth={200}>
                    <Link to="/admin/product-upload">
                        <Button variant="contained">
                            Publish new Products
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Layout>
    )
};

export default AdminPage;