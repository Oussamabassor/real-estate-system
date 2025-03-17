import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main content with top padding to account for fixed header */}
            <main className="pt-16"> {/* Adjust pt-16 (4rem) based on your header height */}
                {children}
            </main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout; 