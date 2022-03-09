import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import ChocolateProducts from '../cards/ChocolateProducts'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';

function ChocolateMilk() {

    const productState = useSelector(state => state.products);
    let filteredProductState = productState.filter(item => item.description.includes("Chocolate"));

    
  return (
        <Layout>
          <Box p={4}>
              {
                  filteredProductState.map( (product) => (
                    <Box
                        key={ product.productId }
                        mb={4}
                        display="flex"
                        alignItems="center"
                    > 
                        { product.images.filter( item => item.perspective === "front").map( item => item.sizes.filter( item => item.size == "large").map( item => 
                            <ChocolateProducts
                                products={{
                                    productId: product.productId,
                                    brand: product.brand,
                                    description: product.description,
                                    images: item.url
                                }}
                            />       
                        ))}
                    </Box>
                ))
              }
            </Box>
        </Layout>
    )
};

export default ChocolateMilk