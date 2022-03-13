import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../layout/Layout';
import AxiosBackend from '../../lib/axios/AxiosBackendProducts';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import {
    Box,
    Typography,
    Card,
    CardActions,
    Button,
    Stack,
    TextField,
    CardContent
} from '@mui/material';


function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ signUpForm, setSignUpForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    async function handleUserSignUp(e) {

        e.preventDefault();
        console.log(signUpForm);

        try {

            let payload = await AxiosBackend.post(
                'users/create-user/', {
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
                    minWidth: 275,
                    maxWidth: 700,
                    padding: 3,
                }}>
                    <CardContent >
                        <Stack
                            component="form"
                            sx={{
                                width: '60ch',
                                m: 'auto'
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
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
                        <Button onClick={handleUserSignUp} variant='contained'>Log In User</Button>
                    </CardActions>
                </Card>
            </Box>
        </Layout>
    )
}

export default SignIn