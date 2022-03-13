import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Search from '../search/Search';
import {
    Box,
    Button
} from '@mui/material';

const HomePage = (props) => {

    return (
        <Layout>
            {/* <Box>
                <Search />
            </Box> */}
            <Box p={4}>
                <Link
                    to={"/product-display"}
                    state={{
                        includes: ["Chocolate"],
                        doesNotInclude: ["Creamer"]
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
                        doesNotInclude: ["Powder"]
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
        </Layout>
    )
};

export default HomePage;