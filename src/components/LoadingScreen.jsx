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
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900"
      >
        <div className="absolute inset-0 bg-gray-800 opacity-40" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="md:ml-auto md:w-1/2 md:pl-10">
            <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-8" />
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-primary-600 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section Skeleton */}
      <motion.div
        variants={itemVariants}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 transition-all duration-300 card group"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-full bg-gray-100 group-hover:bg-gray-200">
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
      {/* Header Skeleton */}
      <motion.header
        variants={itemVariants}
        className="sticky top-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
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
