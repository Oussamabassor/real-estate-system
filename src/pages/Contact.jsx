import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    PhoneIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    MapPinIcon,
    ClockIcon,
    BuildingOfficeIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

export default function Contact() {
    const [contactMethod, setContactMethod] = useState('whatsapp');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredDate: '',
        preferredTime: '',
        propertyInterest: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = `
Hello, I would like to make a reservation!

Property of Interest: ${formData.propertyInterest}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Date: ${formData.preferredDate}
Preferred Time: ${formData.preferredTime}

Message: ${formData.message}
        `.trim();

        switch (contactMethod) {
            case 'whatsapp':
                window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`);
                break;
            case 'email':
                window.open(`mailto:contact@realestate.com?subject=Property Reservation Request - ${formData.propertyInterest}&body=${encodeURIComponent(message)}`);
                break;
            case 'phone':
                window.open('tel:1234567890');
                break;
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <div className="relative bg-blue-600 text-white py-24">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Let us help you find your dream property. Our team of experts is ready to assist you.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Information Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="relative">
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4">
                                        <BuildingOfficeIcon className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Contact Information</h2>

                                    <div className="space-y-6">
                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            <PhoneIcon className="h-6 w-6 text-blue-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="text-lg font-semibold text-gray-900">+1 (234) 567-890</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-500">Email</p>
                                                <p className="text-lg font-semibold text-gray-900">contact@realestate.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            <MapPinIcon className="h-6 w-6 text-blue-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-500">Address</p>
                                                <p className="text-lg font-semibold text-gray-900">123 Real Estate Street</p>
                                                <p className="text-gray-600">New York, NY 10001</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            <ClockIcon className="h-6 w-6 text-blue-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-500">Business Hours</p>
                                                <p className="text-lg font-semibold text-gray-900">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                                <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Make a Reservation</h2>

                            {/* Contact Method Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Choose Contact Method</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('whatsapp')}
                                        className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${contactMethod === 'whatsapp'
                                                ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                        WhatsApp
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('email')}
                                        className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${contactMethod === 'email'
                                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                                        Email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('phone')}
                                        className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 ${contactMethod === 'phone'
                                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <PhoneIcon className="h-5 w-5 mr-2" />
                                        Phone
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Property of Interest</label>
                                    <input
                                        type="text"
                                        name="propertyInterest"
                                        value={formData.propertyInterest}
                                        onChange={handleInputChange}
                                        placeholder="Enter property name or ID"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                                        <input
                                            type="date"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                                        <input
                                            type="time"
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Tell us more about your requirements..."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className={`w-full flex items-center justify-center py-4 px-6 rounded-lg shadow-lg text-white font-medium text-lg transition-all duration-200 ${contactMethod === 'whatsapp'
                                                ? 'bg-green-500 hover:bg-green-600 shadow-green-200'
                                                : contactMethod === 'email'
                                                    ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'
                                                    : 'bg-purple-500 hover:bg-purple-600 shadow-purple-200'
                                            }`}
                                    >
                                        {contactMethod === 'whatsapp'
                                            ? 'Send WhatsApp Message'
                                            : contactMethod === 'email'
                                                ? 'Send Email'
                                                : 'Make Phone Call'}
                                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 