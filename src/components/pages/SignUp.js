import React, { useState } from 'react'
import Layout from '../layout/Layout';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardActions,
    Button,
    Stack,
    TextField,
    CardContent,
    Typography
} from '@mui/material';

function SignIn() {

    const navigate = useNavigate();

    const [ signUpForm, setSignUpForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
    })

    async function handleUserSignUp(e) {

        e.preventDefault();
 
        try {

            let payload = await AxiosBackend.post(
                'user/create-user/', {
                user: signUpForm
            },
            )
                .then(
                    navigate("/sign-in")
            )
            
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
                        <Stack
                            component="form"
                            sx={{
                                width: '100%',
                                m: 'auto'
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography variant="h3" pb={3}>Sign Up</Typography>
                            <TextField
                                id="filled-large"
                                label="First Name"
                                variant="filled"
                                size="large"
                                value={ signUpForm.firstName }
                                onChange={ (event) => {
                                    setSignUpForm({ ...signUpForm, firstName: event.target.value });
                                } }
                            />
                            <TextField
                                id="filled-large"
                                label="Last Name"
                                variant="filled"
                                size="large"
                                value={ signUpForm.lastName }
                                onChange={(event) => {
                                    setSignUpForm({ ...signUpForm, lastName: event.target.value });
                                }}
                            />
                            <TextField
                                id="filled-large"
                                label="Email"
                                variant="filled"
                                size="large"
                                value={signUpForm.email}
                                onChange={(event) => {
                                    setSignUpForm({ ...signUpForm, email: event.target.value });
                                }}
                            />
                            <TextField
                                id="filled-large"
                                label="Password"
                                type="password"
                                variant="filled"
                                size="large"
                                value={signUpForm.password}
                                onChange={(event) => {
                                    setSignUpForm({ ...signUpForm, password: event.target.value });
                                }}
                            />
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={handleUserSignUp} variant='contained'>Create User</Button>
                    </CardActions>
                </Card>
            </Box>
        </Layout>
    )
}

export default SignIn