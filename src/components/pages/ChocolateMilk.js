import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import ChocolateProduct from '../cards/ChocolateProduct'
import ReactPaginate from "react-paginate";
import {
    Box,
    Typography
} from '@mui/material';

function ChocolateMilk() {

    const productState = useSelector(state => state.products);
    let filteredProductState = productState
        .filter(item => item.description.includes("Chocolate") && !item.description.includes("Creamer"));
   
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
                    <ChocolateProduct
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
        </Layout>
    )
};

export default ChocolateMilk