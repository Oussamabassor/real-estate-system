import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function LoadingScreen() {
  const location = useLocation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const renderHomeSkeleton = () => (
    <>
      {/* Hero Section Skeleton */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 mt-16"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-gray-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-12 w-3/4 bg-white/20 backdrop-blur rounded animate-pulse mx-auto mb-4" />
            <div className="h-6 w-1/2 bg-white/10 backdrop-blur rounded animate-pulse mx-auto mb-8" />

            {/* Improved Search Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-5">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-12 w-full bg-white/80 backdrop-blur rounded-lg animate-pulse" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="h-12 w-full bg-white/80 backdrop-blur rounded-lg animate-pulse" />
                </div>
                <div className="sm:col-span-3">
                  <div className="h-12 w-full bg-primary-600 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Stats Section Skeleton */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-50 py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary-50 rounded-xl">
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Properties Skeleton */}
      <motion.div
        variants={itemVariants}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderPropertiesSkeleton = () => (
    <motion.div
      variants={itemVariants}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPropertyDetailsSkeleton = () => (
    <motion.div
      variants={itemVariants}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="aspect-w-16 aspect-h-9 mb-8">
          <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderAuthSkeleton = () => (
    <motion.div
      variants={itemVariants}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
          <div className="mt-6 h-8 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
          <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
            <div className="h-10 w-full bg-primary-600 rounded animate-pulse mt-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProfileSkeleton = () => (
    <motion.div
      variants={itemVariants}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderReservationsSkeleton = () => (
    <motion.div
      variants={itemVariants}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return renderHomeSkeleton();
      case "/properties":
        return renderPropertiesSkeleton();
      case "/login":
      case "/register":
        return renderAuthSkeleton();
      case "/profile":
        return renderProfileSkeleton();
      case "/reservations":
        return renderReservationsSkeleton();
      default:
        return (
          <motion.div
            variants={itemVariants}
            className="min-h-screen bg-gray-50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50"
    >
      {/* Header Skeleton - Improved Layout */}
      <motion.header
        variants={itemVariants}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-white/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <div className="flex space-x-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>

            {/* Right Section - Auth Buttons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-4">
                <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-9 w-24 bg-primary-600 rounded-md animate-pulse" />
              </div>
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer Skeleton */}
      <motion.footer
        variants={itemVariants}
        className="bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
              >
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>

      {/* Custom Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .card {
          @apply bg-white rounded-lg shadow-sm transition-all duration-300;
        }
        .card:hover {
          @apply shadow-md transform -translate-y-1;
        }
      `}</style>
    </motion.div>
  );
}

