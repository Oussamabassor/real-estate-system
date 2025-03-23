import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import {
    UserIcon,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
    BellIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import Logo from './Logo';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const { user, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Public routes available to all users
    const publicNavItems = [
        { name: "Home", path: "/" },
        { name: "Properties", path: "/properties" },
        { name: "Contact", path: "/contact" },
    ];

    // Routes for authenticated users
    const userNavItems = [
        { name: "My Reservations", path: "/reservations" },
    ];

    // Admin-only routes
    const adminNavItems = [
        { name: "Dashboard", path: "/dashboard" },
    ];

    // Combine the appropriate navigation items based on user role
    const navItems = [
        ...publicNavItems,
        ...(user ? userNavItems : []),
        ...(isAdmin ? adminNavItems : [])
    ];

    // Rest of the component code...
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
        setShowSearch(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-lg py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Logo variant={isScrolled ? 'dark' : 'light'} />

                    {/* Desktop Navigation */}
                    <div className="items-center hidden space-x-6 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`relative text-sm font-medium transition-all duration-200 group ${isScrolled
                                    ? 'text-gray-700 hover:text-purple-600'
                                    : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full ${location.pathname === item.path ? 'w-full' : ''
                                    }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="items-center hidden space-x-4 md:flex">
                        {/* Search Button */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className={`p-2 rounded-full transition-all duration-200 ${isScrolled
                                ? 'hover:bg-purple-50 text-gray-600 hover:text-purple-600'
                                : 'hover:bg-white/10 text-white/90 hover:text-white'
                                }`}
                        >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </button>

                        {/* Show these buttons only for authenticated users */}
                        {user && (
                            <>
                                {/* Favorites */}
                                <Link
                                    to="/profile"
                                    className={`p-2 rounded-full transition-all duration-200 ${isScrolled
                                        ? 'hover:bg-purple-50 text-gray-600 hover:text-purple-600'
                                        : 'hover:bg-white/10 text-white/90 hover:text-white'
                                        }`}
                                >
                                    <HeartIcon className="w-5 h-5" />
                                </Link>

                                {/* Notifications */}
                                <button
                                    className={`p-2 rounded-full transition-all duration-200 ${isScrolled
                                        ? 'hover:bg-purple-50 text-gray-600 hover:text-purple-600'
                                        : 'hover:bg-white/10 text-white/90 hover:text-white'
                                        }`}
                                >
                                    <BellIcon className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* Profile/Sign In Button */}
                        {!user ? (
                            <Link
                                to="/login"
                                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${isScrolled
                                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200/50 hover:shadow-xl'
                                    : 'bg-white text-purple-600 hover:bg-purple-50 shadow-lg shadow-purple-900/20 hover:shadow-xl'
                                    }`}
                            >
                                Sign In
                            </Link>
                        ) : (
                            <Link
                                to="/profile"
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${isScrolled
                                    ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                <UserIcon className="w-5 h-5" />
                                {user.name}
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg md:hidden"
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
                        ) : (
                            <Bars3Icon className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
                        )}
                    </button>
                </nav>

                {/* Search Bar */}
                <AnimatePresence>
                    {showSearch && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 px-4 mt-4 top-full"
                        >
                            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search properties, locations..."
                                        className="w-full px-6 py-4 pr-12 bg-white border border-gray-100 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute p-2 text-gray-400 transition-colors -translate-y-1/2 right-2 top-1/2 hover:text-purple-600"
                                    >
                                        <MagnifyingGlassIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 md:hidden"
                        >
                            <div className="p-4 space-y-4 shadow-lg rounded-2xl bg-white/90 backdrop-blur-lg">
                                {/* Mobile Navigation */}
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`block px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 ${location.pathname === item.path ? 'bg-purple-50 text-purple-600' : ''
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                                {/* Mobile Actions */}
                                {user && (
                                    <div className="grid grid-cols-2 gap-4 px-4 pt-4 border-t border-gray-100">
                                        <Link 
                                            to="/profile" 
                                            className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <HeartIcon className="w-5 h-5" />
                                            Favorites
                                        </Link>
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600">
                                            <BellIcon className="w-5 h-5" />
                                            Notifications
                                        </button>
                                    </div>
                                )}

                                {/* Sign In Button for Mobile */}
                                {!user ? (
                                    <Link
                                        to="/login"
                                        className={`w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-200/50`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                ) : (
                                    <Link
                                        to="/profile"
                                        className={`w-full px-4 py-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200 shadow-lg shadow-purple-200/50`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <UserIcon className="w-5 h-5" />
                                            {user.name}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}