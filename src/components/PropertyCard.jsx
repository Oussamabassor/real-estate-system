import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HomeIcon, BedIcon, BathIcon, Square2StackIcon } from '@heroicons/react/24/outline';

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
        <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={images[0]}
                    alt={title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
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

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <Link to={`/properties/${id}`} className="hover:text-primary-600">
                        {title}
                    </Link>
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <BedIcon className="h-5 w-5 mr-1" />
                            <span>{bedrooms} beds</span>
                        </div>
                        <div className="flex items-center">
                            <BathIcon className="h-5 w-5 mr-1" />
                            <span>{bathrooms} baths</span>
                        </div>
                        <div className="flex items-center">
                            <Square2StackIcon className="h-5 w-5 mr-1" />
                            <span>{area} m²</span>
                        </div>
                    </div>
                    {type === 'apartment' && (
                        <div className="flex items-center">
                            <HomeIcon className="h-5 w-5 mr-1" />
                            <span>Floor {floor}</span>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <Link
                        to={`/properties/${id}`}
                        className="btn btn-primary w-full text-center"
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