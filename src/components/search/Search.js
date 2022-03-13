import React from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

function Search() {

    const productState = useSelector(state => state.products);

    return (
        <Stack spacing={2} sx={{ width: 500 }}>
            <Autocomplete
                id="size-large-standard"
                size="large"
                options={productState}
                getOptionLabel={(option) => option.description}
                defaultValue={productState[ 13 ]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Search"
                        placeholder="Favorites"
                    />
                )}
            />
        </Stack>
    )
}

export default Search