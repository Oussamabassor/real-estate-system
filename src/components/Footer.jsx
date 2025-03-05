import { Link } from 'react-router-dom';
import {
    BuildingOfficeIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon,
} from './Icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
    ];

    const resourceLinks = [
        { name: 'Property Guides', href: '/guides' },
        { name: 'Market Updates', href: '/market-updates' },
        { name: 'Buying Guide', href: '/buying-guide' },
        { name: 'Selling Guide', href: '/selling-guide' },
    ];

    const legalLinks = [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Disclaimer', href: '/disclaimer' },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' },
        { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com' },
        { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
        { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
    ];

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
                            <span className="text-2xl font-bold text-gray-900">LuxeStay</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Your trusted partner in finding the perfect property. We make real estate simple, efficient, and transparent.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-primary-600 transition-colors"
                                >
                                    <item.icon className="h-6 w-6" />
                                    <span className="sr-only">{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resource Links */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-gray-600">
                                <PhoneIcon className="h-5 w-5 text-primary-600" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600">
                                <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                                <span>contact@luxestay.com</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-600">
                                <MapPinIcon className="h-5 w-5 text-primary-600 mt-1" />
                                <span>123 Property Lane,<br />Real Estate City, RE 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-gray-600 text-sm">
                            © {currentYear} LuxeStay. All rights reserved.
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center space-x-6">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 