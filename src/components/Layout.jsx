import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-20">
                {children}
            </main>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}; 