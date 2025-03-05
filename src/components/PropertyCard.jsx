import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faBath, faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeIcon, Square2StackIcon } from '@heroicons/react/24/outline';

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

    return (
        <div className="relative overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md group hover:shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={images[0]}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {type === 'bungalow' ? 'Bungalow' : 'Apartment'}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                        ${price.toLocaleString()}
                    </span>
                </div>

                <h3 className="mb-2 text-lg font-medium text-gray-900">
                    <Link to={`/properties/${id}`} className="hover:text-primary-600">
                        {title}
                    </Link>
                </h3>

                <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faBed} className="w-5 h-5 mr-1" />
                            <span>{bedrooms} beds</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faBath} className="w-5 h-5 mr-1" />
                            <span>{bathrooms} baths</span>
                        </div>
                        <div className="flex items-center">
                            <Square2StackIcon className="w-5 h-5 mr-1" />
                            <span>{area} m²</span>
                        </div>
                    </div>
                    {type === 'apartment' && (
                        <div className="flex items-center">
                            <HomeIcon className="w-5 h-5 mr-1" />
                            <span>Floor {floor}</span>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <Link
                        to={`/properties/${id}`}
                        className="w-full text-center btn btn-primary"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
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