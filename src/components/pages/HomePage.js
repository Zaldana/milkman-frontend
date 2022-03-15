import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Search from '../search/Search';
import Hero from '../../images/hero.jpg'
import Pattern from '../../images/pattern.jpg'
import {
    Box,
    Button,
    Typography
} from '@mui/material';

const HomePage = (props) => {

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
            <Box
                pl={8} pr={8} mt={5}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    alignText: "center",
                    alignItems: "center"
                }}
            >
                <Link
                    to={"/product-display"}
                    state={{
                        includes: ["Chocolate"],
                        doesNotInclude: ["Creamer"]
                    }}
                >
                    <Box
                        style={{
                            height: 100,
                            width: 200,
                            border: "4 solid red",
                            justifyContent: "center"
                        }}>
                        <Typography>Chocolate Milk</Typography>
                    </Box>
                </Link>
                <Link
                    to={"/product-display"}
                    state={{
                        includes: [ "Creamer" ],
                        doesNotInclude: ["Powder"]
                    }}
                >
                    <Box>
                        Creamer
                    </Box>
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
                    <Box>
                        Lactose Free & Plant Based Milk
                    </Box>
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
                    <Box>
                       Natural Milk
                    </Box>
                </Link>
            </Box>
        </Layout>
    )
};

export default HomePage;