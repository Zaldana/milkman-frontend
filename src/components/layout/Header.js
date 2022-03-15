import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT_ACTION } from '../../reduxStore/userState';
import { AccountCircle } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import logo from '../../images/logo.png'
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Tooltip,
    Menu,
    MenuItem
} from '@mui/material';


const dropdownMenu = [
    { text: "Log-In", link: "/sign-in"},
    { text: "Sign-Up", link: "/sign-up"}
];

const dropdownMenuSignedIn = [
    { text: "Sign-Out", link: "/"},
];

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    
    const [ anchorElUser, setAnchorElUser ] = React.useState(null);

    const quantityBadge = cart.reduce((acc, cartItem) => {
        return acc + cartItem.quantity;
    }, 0);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenuSignedIn = () => {
        
        setAnchorElUser(null);
        AxiosBackend.get('/sign-out').then(() => {
            dispatch({ type: SIGN_OUT_ACTION });
        }).catch(error => console.log('there was an error signing out'))
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#c2ddff' }}>
                <Toolbar>
                    <Box >
                        <Link to="/" style={{ color: "#172e42",textDecoration: "none"}}>
                            <Typography variant="h6" style={{ fontFamily: "'Fredoka One', cursive" }} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                                Milkman
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{ paddingLeft: 1, flexGrow: 1 }}>
                        <Link to="/">
                            <img src={logo} alt="milkman logo" style={{ height: 35 }} />
                        </Link>
                    </Box>
                    <Box mr={4}>
                        {
                            user && user.isAdmin && (
                                <Link to="/admin">
                                    <Button color="inherit">admin</Button>
                                </Link>
                            )
                        }
                    </Box>
                    <Box>
                        {
                            user && !user.isAdmin && (
                                <Box mr={4}>
                                    <Link to="/user" style={{ color: "white", textDecoration: "none" }}>
                                        <Typography style={{ color: "#172e42", fontFamily: "'Fredoka One', cursive" }}>
                                            Hi, {user.firstName}
                                        </Typography>
                                    </Link>
                                </Box>
                            )
                        }
                    </Box>
                    {
                        user ? (
                            <Box>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <AccountCircle />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {dropdownMenuSignedIn.map(item => (
                                            <MenuItem key={item.text} onClick={handleCloseUserMenuSignedIn}>
                                                <Link to={item.link}>
                                                    <Typography textAlign="center">{item.text}</Typography>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Box>
                            ) : (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <AccountCircle />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {dropdownMenu.map(item => (
                                            <MenuItem key={item.text} onClick={handleCloseUserMenu}>
                                                <Link to={item.link}>
                                                    <Typography textAlign="center">{item.text}</Typography>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            )
                        }
                    <Link to="/shopping-cart">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ ml: 1 }}
                        >
                            <Badge badgeContent={ quantityBadge } color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Link >
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;