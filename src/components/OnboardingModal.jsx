import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye, EyeOff, ShoppingCart, X } from "lucide-react";
import OnboardingWizard from "./OnboardingWizard"; // Import the OnboardingWizard component

const OnboardingModal = ({ isOpen, onClose, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, setShowOnboarding } = useAuth();

  // DEMO: Simulate successful signup regardless of backend
  const demoRegister = async (userData) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a user object and token
        const fakeUser = {
          name: userData.name,
          email: userData.email,
          onboarding_completed: false,
        };
        localStorage.setItem("unicart_token", "demo-token");
        localStorage.setItem("user_data", JSON.stringify(fakeUser));
        setLoading(false);
        setError("");
        setShowOnboarding(true); // Ensure onboarding modal appears
        resolve({ success: true });
      }, 800);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      // await register({
      //   name: formData.name.trim(),
      //   email: formData.email.trim().toLowerCase(),
      //   password: formData.password,
      // });
      await demoRegister({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      if (onSignupSuccess) {
        onSignupSuccess();
      } else {
        setShowOnboardingWizard(true); // fallback for legacy usage
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="sm:max-w-md backdrop-blur-sm bg-opacity-60"
          aria-describedby="onboarding-description"
        >
          <DialogHeader>
            <DialogTitle className="text-center relative">
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to UniCart
              </h2>
              <p className="text-gray-600 mt-2">Join the campus marketplace</p>
            </DialogTitle>
            <DialogDescription id="onboarding-description">
              Create your account to buy and sell items with fellow students.
              All emails are accepted.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@university.edu"
                required
                className="w-full"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                  className="w-full pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              {loading ? "Creating Account..." : "Continue"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </DialogContent>
      </Dialog>
      {/* {showOnboardingWizard && (
        <OnboardingWizard
          isOpen={true}
          onClose={() => setShowOnboardingWizard(false)}
        />
      )} */}
    </>
  );
};

export default OnboardingModal;
