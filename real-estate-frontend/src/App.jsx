import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/LoadingScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { user, loading: authLoading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Protected route wrapper with role check
  const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Admin route wrapper
  const AdminRoute = ({ children }) => {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          {pageLoading || authLoading ? (
            <LoadingScreen />
          ) : (
            <div className="flex flex-col min-h-screen bg-gray-50">
              {/* Toast Notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#333",
                    color: "#fff",
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: "#4ade80",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
                  },
                }}
              />

              {/* Navigation */}
              <Header />

              {/* Main Content */}
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={user?.role === 'admin' ? <Navigate to="/dashboard" /> : <Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<PropertyDetails />} />
                  <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                  <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Admin Routes */}
                  <Route
                    path="/dashboard/*"
                    element={
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    }
                  />

                  {/* Protected User Routes */}
                  <Route
                    path="/reservations"
                    element={
                      <ProtectedRoute>
                        <Reservations />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          )}
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
