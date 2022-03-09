import React, { useEffect } from 'react';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { productsActionCreator } from '../../reduxStore/productState';
import axios from 'axios';

const Layout = (props) => {

    const { children } = props;
    const dispatch = useDispatch();

    useEffect(() => {

        async function fetchProducts() {
            let productsResult = await axios.get(
                'http://localhost:3001/api/products/',
            );
            dispatch(productsActionCreator(productsResult.data.allProducts))
        }

        fetchProducts()

    }, [])

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
};

export default Layout;