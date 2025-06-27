import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem("unicart_token");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch("/api/auth/validate", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);

        // If user hasn't completed onboarding, show it
        if (!userData.onboarding_completed) {
          setShowOnboarding(true);
        }
      } else {
        // Token invalid, remove it
        localStorage.removeItem("unicart_token");
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("unicart_token");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { token, user: newUser } = await response.json();

      localStorage.setItem("unicart_token", token);
      setUser(newUser);

      // Show onboarding after registration
      setShowOnboarding(true);

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async (onboardingData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("unicart_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        throw new Error("Onboarding failed");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setShowOnboarding(false);

      return { success: true };
    } catch (error) {
      console.error("Onboarding error:", error);
      throw new Error("Onboarding failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token, user: userData } = await response.json();

      localStorage.setItem("unicart_token", token);
      setUser(userData);

      // If user hasn't completed onboarding, show it
      if (!userData.onboarding_completed) {
        setShowOnboarding(true);
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("unicart_token");
    setUser(null);
    setShowOnboarding(false);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    showOnboarding,
    setShowOnboarding,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
