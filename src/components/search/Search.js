import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {
    Button
} from '@mui/material';

function Search() {

    const [ search, setSearch ] = useState("")


    function onChange(event) {

        let inputFormat = event && event[ 0 ].toUpperCase() + event.slice(1)
        setSearch(inputFormat)
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingLeft: 3,
                paddingRight: 3
            }}>
            
            <TextField
                fullWidth
                id="filled-large"
                label="Search"
                variant="outlined"
                size="small"
                value={search}
                onChange={(event) => {
                    onChange( event.target.value );
                }}
                placeholder="Search Products"
            />
            <Link
                to={"/product-display"}
                state={{
                    includes: [ search ],
                    doesNotInclude: [ "Powder" ]
                }}
                style={{
                    textDecoration: "none"
                }}
            >
                <Button sx={{ textDecoration: "none"}} variant="contained" >
                   Search
                </Button>
            </Link>
        </Stack>
    )
}

export default Search