import React, { useState, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import ProductCard from '../cards/ProductCard'
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Box,
    Typography
} from '@mui/material';

function ProductDisplay() {

    const location = useLocation();

    const includesArray = location.state.includes;
    const includes = new RegExp(includesArray.join('|'));
    const doesNotIncludeArray = location.state.doesNotInclude;
    const doesNotInclude = new RegExp(doesNotIncludeArray.join('|'));

    const productState = useSelector(state => state.products);
    let filteredProductState = productState
        .filter(item => includes.test(item.description) && !doesNotInclude.test(item.description));
   
    const [ products, setProducts ] = useState(filteredProductState);
    const [ pageNumber, setPageNumber ] = useState(0);

    const productsPerPage = 16;
    const pagesVisited = pageNumber * productsPerPage;

    const displayProducts = products
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((product, i) => {
            return (
                <Box
                    key={i}
                    mb={4}
                    display="flex"
                    alignItems="center"
                >
                    <ProductCard
                        product={product}
                    />
                </Box>
            );
        });

    const pageCount = Math.ceil(products.length / productsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

  return (
      <Layout>
            <Box>
                {
                    products.length > 1 ? (

                        <Box spacing={2}>
                            {displayProducts}
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />

                        </Box>
                    ) : (
                        <Box>
                            <Typography>Loading</Typography>
                        </Box>
                    )
                }
            </Box>
        </Layout>
    )
};

export default ProductDisplay