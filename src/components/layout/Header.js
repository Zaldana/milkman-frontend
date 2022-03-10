import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from "react-router-dom";


const Header = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to="/">
                            <Typography variant="h6" component="div">
                                Milkman
                            </Typography>
                        </Link>
                    </Box>
                    {/* IF user is logged in show "hi, <user.firstName>" instead */}
                    <Link to="/shopping-cart">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ ml: 1 }}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Link >
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;



// {
//     user
//         ? `Hi, ${user.firstName}`
//         : (
//             <Link to="/sign-in">
//                 <Button color="inherit">Sign in</Button>
//             </Link >
//         )
// }
// <Link to="/cart">
//     <IconButton
//         size="large"
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         sx={{ ml: 1 }}
//     >
//         <ShoppingCartIcon />
//     </IconButton>
// </Link >