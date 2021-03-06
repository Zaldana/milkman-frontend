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
    Stack,
    TextField,
    CardContent,
} from '@mui/material';

function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isAdmin, setIsAdmin ] = useState("")
    const [ signInForm, setSignInForm ] = useState({
        email: '',
        password: '',
    })

    async function handleUserLogIn(e) {

        e.preventDefault();

        try {

            let payload = await AxiosBackend.post(
                'user/sign-in/', {
                    userCredentials: signInForm
                },
            )
                .then(response => {
     
                    dispatch(signInActionCreator(response.data.user))

                    if (response.data.user.isAdmin === true) {

                        navigate('/admin');

                    } else {

                        navigate('/product-display')
                    }
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
                        <Typography variant="h3" pb={3}>Log-In</Typography>
                        <Stack
                            component="form"
                            sx={{
                                width: '30ch',
                                m: 'auto'
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="filled-large"
                                label="email"
                                variant="filled"
                                size="large"
                                value={signInForm.email}
                                onChange={(event) => {
                                    setSignInForm({ ...signInForm, email: event.target.value });
                                }}
                            />
                            <TextField
                                id="filled-large"
                                label="Password"
                                type="password"
                                variant="filled"
                                size="large"
                                value={signInForm.password}
                                onChange={(event) => {
                                    setSignInForm({ ...signInForm, password: event.target.value });
                                }}
                            />
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={handleUserLogIn} variant='contained'>Log In User</Button>
                    </CardActions>
                </Card>
            </Box>
        </Layout>
    )
}

export default SignIn