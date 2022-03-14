import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Box, Button, Card, TextField, Modal, Typography } from '@mui/material';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const AdminPage = () => {

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
            <Box p={4}>
                <h2>Admin / control panel</h2>
               
                <div>
                    <Button onClick={handleOpen}>Open modal</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box maxWidth={400}>
                                <Box>
                                    <h4>Upload Product</h4>
                                </Box>
                                <Box pb={3}>
                                    <TextField
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
                                        id="size"
                                        label="Size (oz)"
                                        variant="standard"
                                        value={uploadProductForm.size}
                                        onChange={(event) => {
                                            setUploadProductForm({ ...uploadProductForm, size: event.target.value });
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Button variant="contained" onClick={onSubmit}>Upload product</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                </div>
                <Box p={4}>
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
            </Box>
        </Layout>
    )
};



export default AdminPage;