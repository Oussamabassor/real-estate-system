import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { faBath, faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const DEFAULT_IMAGE = 'https://picsum.photos/600/400'; // More reliable placeholder service

export default function PropertyCard({ property }) {
    const {
        id,
        title,
        description,
        price,
        type,
        bedrooms,
        bathrooms,
        area,
        images,
        floor,
    } = property;

    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl"
        >
            <motion.div
                className="aspect-w-16 aspect-h-9 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src={!imageError && images?.[0] ? images[0] : DEFAULT_IMAGE}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        setImageError(true);
                        e.target.src = DEFAULT_IMAGE;
                    }}
                />
            </motion.div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <motion.span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        whileHover={{ scale: 1.05 }}
                    >
                        {type === 'bungalow' ? 'Bungalow' : 'Apartment'}
                    </motion.span>
                    <motion.span
                        className="text-lg font-semibold text-gray-900"
                        whileHover={{ scale: 1.05 }}
                    >
                        ${price.toLocaleString()}
                    </motion.span>
                </div>

                <motion.h3
                    className="mb-2 text-lg font-medium text-gray-900"
                    whileHover={{ x: 5 }}
                >
                    <Link to={`/properties/${id}`} className="hover:text-primary-600 transition-colors">
                        {title}
                    </Link>
                </motion.h3>

                <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <motion.div
                            className="flex items-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FontAwesomeIcon icon={faBed} className="w-5 h-5 mr-1" />
                            <span>{bedrooms} beds</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FontAwesomeIcon icon={faBath} className="w-5 h-5 mr-1" />
                            <span>{bathrooms} baths</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Square2StackIcon className="w-5 h-5 mr-1" />
                            <span>{area} m²</span>
                        </motion.div>
                    </div>
                    {type === 'apartment' && floor && (
                        <motion.div
                            className="flex items-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <HomeIcon className="w-5 h-5 mr-1" />
                            <span>Floor {floor}</span>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    className="mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Link
                        to={`/properties/${id}`}
                        className="w-full text-center btn btn-primary"
                    >
                        View Details
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

PropertyCard.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['apartment', 'bungalow']).isRequired,
        bedrooms: PropTypes.number.isRequired,
        bathrooms: PropTypes.number.isRequired,
        area: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        floor: PropTypes.number,
    }).isRequired,
}; 