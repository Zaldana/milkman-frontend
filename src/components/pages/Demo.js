import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signInActionCreator } from '../../reduxStore/userState';
import Layout from '../layout/Layout';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardActions,
    Button,
    CardContent,
} from '@mui/material';


function Demo() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleUserLogIn(e) {

        e.preventDefault();

        try {

            let payload = await AxiosBackend.post(
                'user/sign-in/', {
                userCredentials: {
                    email: 'ruben@email.com',
                    password: 'password',
                }
            })
                .then(response => {
                    dispatch(signInActionCreator(response.data.user))
                    navigate('/product-display');
                })

        } catch (e) {

            console.log(e);
        }
    }

    async function handleAdminLogIn(e) {

        e.preventDefault();

        try {

            let payload = await AxiosBackend.post(
                'user/sign-in/', {
                userCredentials: {
                    email: 'kitty@gmail.com',
                    password: 'password',
                }
            })
                .then(response => {
                    dispatch(signInActionCreator(response.data.user))
                    navigate('/admin');
                })

        } catch (e) {

            console.log(e);
        }
    }

    return (
        <Layout>
            <Box sx={{
                mx: 'auto',
                minWidth: 300,

                p: 2,
                m: 'auto',
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
                display: 'flex',
                justifyContent: "center"
            }}>
                <Card sx={{
                    maxWidth: 700,
                    padding: 3,
                    marginTop: 10,
                }}>
                    <CardContent >
                        <Typography variant="h3" pb={3}>Demo Login</Typography>

                    </CardContent >
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={handleUserLogIn} variant='contained'>User Login</Button>
                        <Button onClick={handleAdminLogIn} variant='contained'>Admin Login</Button>
                    </CardActions>
                </Card>
            </Box>
        </Layout>
    )
}

export default Demo