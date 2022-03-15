import React from 'react'
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Typography
} from '@mui/material';


function Buttons() {
    return (
      
        <Box pl={10} pr={10} mt={5}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap"
            }}
        >
            <Link
                to={"/product-display"}
                state={{
                    includes: [ "Chocolate" ],
                    doesNotInclude: [ "Creamer" ]
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    style={{
                        margin: 10
                    }}
                >
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
                <Button
                    variant="contained"
                    size="large"
                    style={{
                        margin: 10
                    }}>
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
                <Button
                    variant="contained"
                    size="large"
                    style={{
                        margin: 10
                    }}
                >
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
                <Button
                    variant="contained"
                    size="large"
                    style={{
                        margin: 8
                    }}
                >
                    Natural Milk
                        </Button>
                    </Link>
    </Box>
  )
}

export default Buttons