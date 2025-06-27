import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE = "/backend/api/auth";

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
      const response = await fetch(`${API_BASE}/validate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        localStorage.removeItem("unicart_token");
        localStorage.removeItem("user_data");
        setUser(null);
        setShowOnboarding(false);
        return;
      }
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user_data", JSON.stringify(data.user));
      if (!data.user.onboarding_completed) {
        setShowOnboarding(true);
      }
    } catch (error) {
      localStorage.removeItem("unicart_token");
      localStorage.removeItem("user_data");
      setUser(null);
      setShowOnboarding(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      const { token, user: newUser } = await response.json();
      localStorage.setItem("unicart_token", token);
      localStorage.setItem("user_data", JSON.stringify(newUser));
      setUser(newUser);
      setShowOnboarding(true);
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async (onboardingData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("unicart_token");
      const response = await fetch(`${API_BASE}/onboarding`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Onboarding failed");
      }
      const updatedUser = await response.json();
      setUser(updatedUser.user);
      localStorage.setItem("user_data", JSON.stringify(updatedUser.user));
      setShowOnboarding(false);
      return { success: true };
    } catch (error) {
      console.error("Onboarding error:", error);
      throw new Error(error.message || "Onboarding failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const { token, user: userData } = await response.json();
      localStorage.setItem("unicart_token", token);
      localStorage.setItem("user_data", JSON.stringify(userData));
      setUser(userData);
      if (!userData.onboarding_completed) {
        setShowOnboarding(true);
      }
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("unicart_token");
    localStorage.removeItem("user_data");
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
