import React from 'react';
import Header from './Header';

const Layout = (props) => {
    const { children } = props;


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