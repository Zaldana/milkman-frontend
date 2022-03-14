import React, { useState, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import ProductCard from '../cards/ProductCard'
import AdminProductCard from '../cards/AdminProductCard';
import ReactPaginate from "react-paginate";
import { useLocation } from 'react-router-dom';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import Search from '../search/Search';

import {
    Box,
    Typography
} from '@mui/material';

function ProductDisplay() {

   
    const [ productState, setProductState ] = useState([])

    useEffect(() => {

        async function fetchProducts() {
            let productsResult = await AxiosBackend.get(
                'get-products',
            );
            
            setProductState(productsResult.data)
        }

        fetchProducts()

    }, [])
    
    const location = useLocation();
    const user = useSelector(state => state.user);
   



    const includesArray = location.state.includes;
    const includes = new RegExp(includesArray.join('|'));
    const doesNotIncludeArray = location.state.doesNotInclude;
    const doesNotInclude = new RegExp(doesNotIncludeArray.join('|'));

    let filteredProductState = productState
        .filter(item => includes.test(item.description) && !doesNotInclude.test(item.description));

    const [ pageNumber, setPageNumber ] = useState(0);

    const productsPerPage = 10;
    const pagesVisited = pageNumber * productsPerPage;
    const pageCount = Math.ceil(filteredProductState.length / productsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

  return (
      <Layout>
          <Box p={4}>
              <Search />
          </Box>
          {
              filteredProductState.length > 1 ? (
                  <Box spacing={2}>
                      {
                          user && user.isAdmin ? (
                              filteredProductState.slice(pagesVisited, pagesVisited + productsPerPage)
                                  .map((product, i) => {
                                      return (
                                          <Box
                                              key={i}
                                              mb={4}
                                              display="flex"
                                              alignItems="center"
                                          >
                                              <AdminProductCard
                                                  product={product}
                                                  setProductState={setProductState}
                                                  productState={productState}
                                              />

                                          </Box>
                                          
                                      );
                                  })
                          ) : (
                                  filteredProductState.slice(pagesVisited, pagesVisited + productsPerPage)
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
                                  })
                          )
                      }

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

              ): (
                    <Box>
                        <Typography>Loading</Typography>
                    </Box >
              )
          }
    </Layout>
    )
};

export default ProductDisplay