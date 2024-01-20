import React from 'react';
import NavBar from '../navigation/navBar.jsx';

const LayoutWithNavBar = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default LayoutWithNavBar;