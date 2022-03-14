import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { Link } from 'react-router-dom';
import {
    Box,
    Button
} from '@mui/material';

function Search() {

    const [ search, setSearch ] = useState("")


    function onChange(event) {

        let inputFormat = event && event[ 0 ].toUpperCase() + event.slice(1)
        setSearch(inputFormat)
    }

    return (
        <Stack direction="row" spacing={2} sx={{ width: 500 }}>
            
            <TextField
                id="filled-large"
                label="Search"
                variant="filled"
                size="large"
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
            >
                <Button>
                   Search
                </Button>
            </Link>
                

        </Stack>
    )
}

export default Search