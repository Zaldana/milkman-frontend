import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, TextField, Typography } from '@mui/material';
import AxiosBackend from '../../lib/axios/AxiosBackend';

const uploadFromInitialState = {
    productId: '',
    brand: '',
    category: '',
    description: '',
    image: '',
    price: 0,
    size: '',
};

const AdminPage = () => {


    const [ expanded, setExpanded ] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const user = useSelector(state => state.user);
    
    const [ open, setOpen ] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ uploadProductForm, setUploadProductForm ] = useState(uploadFromInitialState);

    if (!user || !user.isAdmin) {
        return "User is not authorized to be in this page";
    }

    const onSubmit = () => {

        AxiosBackend.post(
            '/upload-product',
            {
                productData: {
                    productId: uploadProductForm.productId,
                    brand: uploadProductForm.brand,
                    categories: [ uploadProductForm.category ],
                    description: uploadProductForm.description,
                    images: [
                        {
                            perspective: "front",
                            sizes: [
                                {
                                    size: "large",
                                    url: uploadProductForm.image
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            price: {
                                regular: uploadProductForm.price
                            }
                        },
                        {
                            size: uploadProductForm.size
                        }
                    ]
                },
            },
        )
            .then(() => {

                setUploadProductForm(uploadFromInitialState);
                handleClose()

            }).catch(error => {
                
                console.log('error: ', error);
            })
    };

    return (
        <Layout>
            <Box p={10}>
                <Typography pb={4} variant="h4">Admin / Control Panel</Typography>
                <Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                                backgroundColor: '#c2ddff'
                            }}
                        >
                            <Typography sx={{ mx: 5 }}>Upload New Product</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ mx: 5 }}>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="productId"
                                    label="Product Id Number"
                                    type="number"
                                    variant="standard"
                                    value={uploadProductForm.productId}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, productId: event.target.value });
                                    }}
                                />
                            </Box>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="brand"
                                    label="Brand"
                                    variant="standard"
                                    value={uploadProductForm.brand}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, brand: event.target.value });
                                    }}
                                />
                            </Box>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="category"
                                    label="Category"
                                    variant="standard"
                                    value={uploadProductForm.category}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, category: event.target.value });
                                    }}
                                />
                            </Box>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="description"
                                    label="Description"
                                    variant="standard"
                                    value={uploadProductForm.description}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, description: event.target.value });
                                    }}
                                />
                            </Box>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="image"
                                    label="Image URL"
                                    variant="standard"
                                    value={uploadProductForm.image}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, image: event.target.value });
                                    }}
                                />
                            </Box>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="price"
                                    label="Price"
                                    type="number"
                                    variant="standard"
                                    value={uploadProductForm.price}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, price: Number(event.target.value) });
                                    }}
                                />
                            </Box>
                            <Box pb={3}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="size"
                                    label="Size (oz)"
                                    variant="standard"
                                    value={uploadProductForm.size}
                                    onChange={(event) => {
                                        setUploadProductForm({ ...uploadProductForm, size: event.target.value });
                                    }}
                                />
                            </Box>
                            <Box pb={2}>
                                <Button variant="contained" onClick={onSubmit}>Upload product</Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            sx={{
                                backgroundColor: '#c2ddff'
                            }}
                        >
                            <Typography sx={{ mx: 5 }}>Edit and/or Delete Products</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box p={4}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Link
                                    to={"/product-display"}
                                    state={{
                                        includes: [ "Chocolate" ],
                                        doesNotInclude: [ "Creamer" ]
                                    }}
                                >
                                    <Button>
                                        Chocolate Milk
                                    </Button>
                                </Link>
                                <Link
                                    to={"/product-display"}
                                    state={{
                                        includes: [ "Creamer" ],
                                        doesNotInclude: [ "Powder" ]
                                    }}
                                >
                                    <Button>
                                        Creamer
                                    </Button>
                                </Link>
                                <Link
                                    to={"/product-display"}
                                    state={{
                                        includes: [
                                            "Lactose",
                                            "Soy",
                                            "Almond",
                                            "Macademia",
                                            "Oat",
                                        ],
                                        doesNotInclude: [ "Creamer" ]
                                    }}
                                >
                                    <Button>
                                        Lactose Free & Plant Based Milk
                                    </Button>
                                </Link>
                                <Link
                                    to={"/product-display"}
                                    state={{
                                        includes: [ "Milk" ],
                                        doesNotInclude: [
                                            "Lactose",
                                            "Soy",
                                            "Almond",
                                            "Macademia",
                                            "Oat",
                                            "Coconut",
                                            "Chocolate",
                                            "Creamer"
                                        ],
                                    }}
                                >
                                    <Button>
                                        Natural Milk
                                    </Button>
                                </Link>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Layout>
    )
};



export default AdminPage;