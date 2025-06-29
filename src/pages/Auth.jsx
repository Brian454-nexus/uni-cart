import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import OnboardingModal from "../components/OnboardingModal";
import OnboardingWizard from "../components/OnboardingWizard";
import { ShoppingCart } from "lucide-react";

const Auth = () => {
  const [showSignup, setShowSignup] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  // After signup, show onboarding wizard
  const handleSignupSuccess = () => {
    setShowSignup(false);
    setShowWizard(true);
  };

  // After onboarding, update onboarding_completed in localStorage and trigger rerender
  const handleWizardClose = () => {
    setShowWizard(false);
    // Mark onboarding as complete in localStorage
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    userData.onboarding_completed = true;
    localStorage.setItem("user_data", JSON.stringify(userData));
    // Also set a dummy token if needed (for demo mode)
    if (!localStorage.getItem("unicart_token")) {
      localStorage.setItem("unicart_token", "demo-token");
    }
    // Trigger AuthContext to re-check onboarding
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        {/* Stylish background shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 opacity-30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-pink-400 opacity-20 rounded-full blur-2xl animate-pulse"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>
        <div className="z-10 w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/30 relative">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight text-center drop-shadow-lg">
              Welcome to UniCart
            </h1>
            <p className="text-lg text-gray-700 text-center mb-2">
              The #1 Campus Marketplace
            </p>
            <p className="text-base text-gray-500 text-center">
              Buy and sell with fellow students. Fast. Safe. Fun.
            </p>
          </div>
          {/* Show signup first, then onboarding wizard */}
          {showSignup && (
            <OnboardingModal
              isOpen={showSignup}
              onClose={() => {}}
              onSignupSuccess={handleSignupSuccess}
            />
          )}
          {showWizard && (
            <OnboardingWizard isOpen={showWizard} onClose={handleWizardClose} />
          )}
        </div>
        <footer className="z-10 mt-8 text-white/80 text-xs text-center">
          &copy; {new Date().getFullYear()} UniCart. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default Auth;
