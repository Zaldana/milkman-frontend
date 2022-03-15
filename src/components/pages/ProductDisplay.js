import React, { useState, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import ProductCard from '../cards/ProductCard'
import AdminProductCard from '../cards/AdminProductCard';
import ReactPaginate from "react-paginate";
import { useLocation } from 'react-router-dom';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import Pattern from '../../images/pattern.jpg';
import Search from '../search/Search';
import Buttons from '../cards/Buttons';

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

    const productsPerPage = 8;
    const pagesVisited = pageNumber * productsPerPage;
    const pageCount = Math.ceil(filteredProductState.length / productsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

  return (
      <Layout>
          <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
          }} fullWidth pl={4} pr={4} pt={4} pb={2}>
              <Search />
          </Box>
          <Box
              pl={6} pr={6}
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
          {
              filteredProductState.length > 1 ? (
                  <Box
                      pl={4} pr={4}
                      style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center"
                      }}
                  >
                      {
                          user && user.isAdmin ? (
                              filteredProductState.slice(pagesVisited, pagesVisited + productsPerPage)
                                  .map((product, i) => {
                                      return (
                                          <Box
                                              key={i}
                                              m={4}
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
                                              m={4}
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
    </Layout>
    )
};

export default ProductDisplay