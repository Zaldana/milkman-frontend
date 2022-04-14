import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Search from '../search/Search';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import Pattern from '../../images/pattern.jpg';
import ProductCard from '../cards/ProductCard'
import Buttons from '../cards/Buttons';
import {
    Box,
    Typography
} from '@mui/material';

const HomePage = (props) => {

    const [ previewProducts, setPreviewProducts ] = useState([])

    function getMultipleRandom(arr, num) {
        const shuffled = [ ...arr ].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    useEffect(() => {

        async function fetchProducts() {
            let productsResult = await AxiosBackend.get(
                'products/get-products',
            );
            setPreviewProducts(getMultipleRandom(productsResult.data, 4))
        }
        fetchProducts()
    }, [])

    return (
        <Layout>
            <Box sx={{
                display: "flex",
                alignItems: "center", 
                justifyContent: "center"
            }} fullWidth p={3}
            >
                <Search />
            </Box>
            <Box
                pl={4} pr={4}
                style={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
               
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexGrow: 1,
                        borderRadius: "10px",
                        height: "auto",
                        width: "55%",
                        boxShadow: "7px 7px 6px 1px rgba(0, 0, 255, .15)",
                        backgroundImage: `url(${Pattern})`,
                    }}
                >
                    <Typography
                        p={9}
                        variant="h3"
                        style={{
                            fontFamily: "'Fredoka One', cursive",
                            color: "#172e42",
                            textAlign: "center",
                            color: "white",
                            textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                        }}
                    >
                        Milkman.com
                    </Typography>
                </Box>
            </Box>
            <Buttons />
            <Typography
                mt={5} ml={5}
                variant="h6"
                sx={{ fontFamily: "Roboto",}}
            >
                FEATURED PRODUCTS
            </Typography>
            <Box
                pl={4} pr={4}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    backgroundColor: "#efefef"
                }}
            >
            {
                previewProducts.length > 1 ? (
                        previewProducts.map((product, i) => {
                                return (
                                    <Box
                                        key={i}
                                        m={4}
                                    >
                                        <ProductCard
                                            product={product}
                                        />
                                    </Box>
                                );
                            })
                ) : (
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "Center",
                                    marginTop: 70
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    style={{
                                        fontFamily: "'Fredoka One', cursive",
                                        textAlign: "center",
                                        textShadow: "5px 5px 5px #19d2ff"
                                    }}
                                >
                                    Loading...
                                </Typography>
                            </Box >
                )
            }
            </Box>
        </Layout>
    )
};

export default HomePage;