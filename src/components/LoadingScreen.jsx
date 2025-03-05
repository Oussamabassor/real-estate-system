import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <div className="relative">
                {/* Animated Building Icon */}
                <div className="relative">
                    <BuildingOfficeIcon className="h-16 w-16 text-primary-600 animate-float" />

                    {/* Animated Circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-24 h-24 border-4 border-primary-200 rounded-full animate-ping opacity-75" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-32 border-4 border-primary-100 rounded-full animate-ping opacity-50 animation-delay-150" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-40 h-40 border-4 border-primary-50 rounded-full animate-ping opacity-25 animation-delay-300" />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Finding Your Dream Home
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we prepare your experience
                    </p>
                </div>

                {/* Loading Progress Bar */}
                <div className="mt-6 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full animate-progress" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-200" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-400" />
            </div>

            {/* Add custom styles to the document */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes progress {
                    0% {
                        width: 0%;
                    }
                    50% {
                        width: 70%;
                    }
                    100% {
                        width: 100%;
                    }
                }

                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(20px, -20px) scale(1.1);
                    }
                    50% {
                        transform: translate(0, 20px) scale(0.9);
                    }
                    75% {
                        transform: translate(-20px, -20px) scale(1.1);
                    }
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-progress {
                    animation: progress 2s ease-in-out infinite;
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-150 {
                    animation-delay: 150ms;
                }

                .animation-delay-200 {
                    animation-delay: 200ms;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animation-delay-400 {
                    animation-delay: 400ms;
                }
            `}</style>
        </div>
    );
} 