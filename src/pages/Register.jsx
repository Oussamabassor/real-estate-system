import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);

    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthColor = () => {
    return (
      [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
      ][passwordStrength] || "bg-gray-200"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms of service.");
      return;
    }

    try {
      setLoading(true);
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: "user",
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/register",
        registrationData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.data) {
        console.error("Validation Errors:", err.response.data.errors);
        setError(Object.values(err.response.data.errors).flat().join(", "));
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="mt-8 text-3xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500"
              >
                <ArrowLeftIcon className="inline w-4 h-4" /> Sign in here
              </Link>
            </p>
          </div>

          <div className="p-8 mt-10 bg-white shadow-xl rounded-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                  <ExclamationCircleIcon className="inline w-5 h-5 text-red-400" />
                  <span className="ml-2 text-red-800">{error}</span>
                </div>
              )}

              <div className="space-y-5">
                {["name", "email", "phone"].map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {field}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border-gray-200 rounded-xl"
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border-gray-200 rounded-xl"
                  />
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
                    <div
                      className={`h-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I accept the{" "}
                  <Link
                    to="/terms"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    privacy policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className="w-full py-3 text-white bg-primary-600 rounded-xl hover:bg-primary-700"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
