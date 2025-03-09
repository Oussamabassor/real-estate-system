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

  const renderUserMenu = () => (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <span className="sr-only">{t('common.openMenu')}</span>
          {user?.profileImage ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full"
              src={user.profileImage}
              alt={user.name}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserCircleIcon className="w-8 h-8 text-primary-600" />
            </motion.div>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500">{t('common.signedInAs')}</p>
            <p className="text-sm font-medium text-gray-800 truncate">
              {user?.name}
            </p>
          </div>
          <Menu.Item>
            {({ active }) => (
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/profile"
                  className={`${active ? "bg-gray-50" : ""} flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <UserCircleIcon className="w-4 h-4 mr-2 text-gray-500" />
                  {t('nav.profile')}
                </Link>
              </motion.div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/favorites"
                  className={`${active ? "bg-gray-50" : ""} flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <HeartIcon className="w-4 h-4 mr-2 text-gray-500" />
                  {t('nav.favorites')}
                </Link>
              </motion.div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/reservations"
                  className={`${active ? "bg-gray-50" : ""} flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <BuildingOfficeIcon className="w-4 h-4 mr-2 text-gray-500" />
                  {t('nav.reservations')}
                </Link>
              </motion.div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={logout}
                  className={`${active ? "bg-gray-50" : ""} flex items-center w-full px-4 py-2 text-left text-sm text-gray-700`}
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
              </motion.div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  const renderAuthButtons = () => (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-md text-primary-600 border-primary-600 hover:bg-primary-50"
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
          className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-md bg-primary-600 hover:bg-primary-700"
        >
          {t('nav.register')}
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Disclosure as="nav" className="sticky top-0 z-50 bg-white shadow">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <motion.div
                    className="flex items-center flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/" className="flex items-center">
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
                      <span className="ml-2 text-2xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text">
                        ORMVAH
                      </span>
                      <span className="ml-1 text-xs font-medium text-gray-500 uppercase">
                        {t('nav.estates')}
                      </span>
                    </Link>
                  </motion.div>
                  <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 hover:text-primary-700 ${isActive(item.href)
                              ? "border-primary-500 text-primary-700"
                              : "border-transparent text-gray-500 hover:border-gray-300"
                            }`}
                        >
                          <item.icon className="w-4 h-4 mr-1" />
                          {t(item.name)}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 mr-3 text-gray-500 rounded-full hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">{t('common.search')}</span>
                      <MagnifyingGlassIcon
                        className="w-6 h-6"
                        aria-hidden="true"
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 mr-4 text-gray-500 rounded-full hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">{t('common.favorites')}</span>
                      <HeartIcon className="w-6 h-6" aria-hidden="true" />
                    </motion.button>
                    {user ? renderUserMenu() : renderAuthButtons()}
                  </div>
                </div>
                <div className="flex items-center -mr-2 sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
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
                          <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-2 pb-3 space-y-1"
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
                      className={`flex items-center py-2 pl-3 pr-4 text-base font-medium border-l-4 ${isActive(item.href)
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {t(item.name)}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center p-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 mr-4 text-gray-500 rounded-full hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <span className="sr-only">{t('common.search')}</span>
                    <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 text-gray-500 rounded-full hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <span className="sr-only">{t('common.favorites')}</span>
                    <HeartIcon className="w-6 h-6" aria-hidden="true" />
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 space-y-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/login"
                        className="block w-full px-4 py-2 text-sm font-medium text-center text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50"
                      >
                        {t('nav.login')}
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/register"
                        className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-primary-600 rounded-md hover:bg-primary-700"
                      >
                        {t('nav.register')}
                      </Link>
                    </motion.div>
                  </motion.div>
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