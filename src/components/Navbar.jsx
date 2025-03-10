import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  HomeIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';

const navigation = [
  { name: 'nav.home', href: '/', icon: HomeIcon },
  { name: 'nav.properties', href: '/properties', icon: BuildingOfficeIcon },
  { name: 'nav.reservations', href: '/reservations', icon: BuildingOfficeIcon },
  { name: 'nav.profile', href: '/profile', icon: UserCircleIcon },
  { name: 'nav.contact', href: '/contact', icon: PhoneIcon },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo Section - Left */}
                <motion.div
                  className="flex-shrink-0 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/" className="flex items-center space-x-2">
                    <svg
                      className="w-8 h-8 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    <div>
                      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text">
                        ORMVAH
                      </span>
                      <span className="ml-1 text-xs font-medium text-gray-500 uppercase">
                        {t('nav.estates')}
                      </span>
                    </div>
                  </Link>
                </motion.div>

                {/* Navigation Links - Center */}
                <div className="hidden md:flex flex-1 items-center justify-center px-8">
                  <div className="flex space-x-8">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive(item.href)
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                            }`}
                        >
                          <item.icon className="w-4 h-4 mr-1.5" />
                          {t(item.name)}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="hidden md:flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 rounded-lg hover:text-primary-600 hover:bg-gray-50"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 rounded-lg hover:text-primary-600 hover:bg-gray-50"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </motion.button>

                  {user ? (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        {user?.profileImage ? (
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 rounded-full object-cover"
                            src={user.profileImage}
                            alt={user.name}
                          />
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center"
                          >
                            <UserCircleIcon className="w-6 h-6 text-primary-600" />
                          </motion.div>
                        )}
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-xs text-gray-500">{t('common.signedInAs')}</p>
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {user?.name}
                            </p>
                          </div>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={`${active ? "bg-gray-50" : ""
                                    } flex items-center px-4 py-2 text-sm text-gray-700`}
                                >
                                  <UserCircleIcon className="w-4 h-4 mr-2 text-gray-500" />
                                  {t('nav.profile')}
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logout}
                                  className={`${active ? "bg-gray-50" : ""
                                    } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                  <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                  </svg>
                                  {t('nav.logout')}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/login"
                          className="px-4 py-2 text-sm font-medium text-primary-600 transition-all duration-200 border border-primary-600 rounded-lg hover:bg-primary-50"
                        >
                          {t('nav.login')}
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/register"
                          className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-primary-600 rounded-lg hover:bg-primary-700"
                        >
                          {t('nav.register')}
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">{t('common.openMenu')}</span>
                    <AnimatePresence mode="wait">
                      {open ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <XMarkIcon className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Bars3Icon className="w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <Disclosure.Panel className="md:hidden">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="px-2 pt-2 pb-3 space-y-1"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 text-base font-medium rounded-lg ${isActive(item.href)
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                        }`}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {t(item.name)}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile actions */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4 space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 rounded-lg hover:text-primary-600 hover:bg-gray-50"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 rounded-lg hover:text-primary-600 hover:bg-gray-50"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {user ? (
                  <div className="px-4 py-3">
                    <p className="text-xs text-gray-500">{t('common.signedInAs')}</p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user?.name}
                    </p>
                  </div>
                ) : (
                  <div className="px-4 py-3 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full px-4 py-2 text-sm font-medium text-center text-primary-600 transition-all duration-200 border border-primary-600 rounded-lg hover:bg-primary-50"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full px-4 py-2 text-sm font-medium text-center text-white transition-all duration-200 bg-primary-600 rounded-lg hover:bg-primary-700"
                    >
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </motion.div>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};