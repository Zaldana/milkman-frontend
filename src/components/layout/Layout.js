import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { productsActionCreator } from '../../reduxStore/productState';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {

    const { children } = props;
    const dispatch = useDispatch();

    useEffect(() => {

        async function fetchProducts() {
            let productsResult = await axios.get(
                'http://localhost:3001/get-products/',
            );
            dispatch(productsActionCreator(productsResult.data))
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
            <div>
                <Footer />
            </div>
        </div>
    )
};

export default Layout;