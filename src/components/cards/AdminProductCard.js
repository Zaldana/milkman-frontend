import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AxiosBackend from '../../lib/axios/AxiosBackend';

import {
    Box,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    CardContent,
    TextField,
    Modal,
    Typography
} from '@mui/material';

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

export default function AdminProductCard(props) {

    const [ uploadProductForm, setUploadProductForm ] = useState(uploadFromInitialState);
    const [ open, setOpen ] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        product,
        setProductState
    } = props;

    //Image url////////////////////////
    const imgObj = product.images.find(el => el.perspective === "front");
    const imageSizeObj = imgObj.sizes.find(el => el.size === "large");
    const image = imageSizeObj.url

    //Item price//////////////////////
    const itemsObj = product.items.find(el => el.price);
    const priceObj = itemsObj.price;
    const price = priceObj.regular

    //Item Brand/////////////////////
    const brand = product.brand;

    //Item Id///////////////////////
    const productId = product.productId;

    //Item Description/////////////
    const description = product.description;

    //Item size////////////////////

  
    async function handleDelete() {

        try {
            
            await AxiosBackend.delete(
                `/delete-product/${product._id}`
            )
            let updatedArray = await AxiosBackend.get(
                'get-products',
            );
            setProductState(updatedArray.data)
        
        } catch (e) {

            console.log('error: ', e);
        }
    }

    async function handleUpdate() {

        try {
            AxiosBackend.put(
                `/update-product/${product._id}`,
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

            let updatedArray = await AxiosBackend.get(
                'get-products',
            );
            setProductState(updatedArray.data)
            handleClose()
            setUploadProductForm(uploadFromInitialState);

        } catch (e) {

            console.log('error: ', e);
        }
    }
         
    return (
        <Card sx={{ mx: 'auto', width: 300, height: 430 }} style={{ padding: '4px' }}>
            <CardMedia
                component="img"
                height="270"
                image={image}
                alt={description}
            />
            <CardContent>
                <Typography variant="h7">{brand}</Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", paddingRight: 3, paddingBottom: 3 }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>Edit Item</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
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
                                type="number"
                                variant="standard"
                                value={uploadProductForm.size}
                                onChange={(event) => {
                                    setUploadProductForm({ ...uploadProductForm, size: event.target.value });
                                }}
                            />
                        </Box>
                        <Box>
                            <Button variant="contained" sx={{ marginTop: 4 }} onClick={() => handleUpdate()}>Publish Edit</Button>
                        </Box>
                    </Box>
                
                </Modal>
                <Button variant="contained" color="error" onClick={() => handleDelete()}>Delete</Button>
            
            </CardActions>
        </Card>
    );
}
