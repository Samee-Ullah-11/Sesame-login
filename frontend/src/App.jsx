import { useState } from "react";
import axios from "axios";
import "./App.css";

// 1. Import your logo image from your assets directory
import logo from "./assets/Sesame_seed_letter_S_logo_2K_202609291503474.jpg";

function App() {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (isSignup && name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignup) {
      if (confirmPassword.trim() === "") {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (!isValid) return;

    if (isSignup) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          { name, email, password }
        );
        console.log("Registration successful", response.data);
      } catch (error) {
        if (error.response?.data?.message) {
          setError({ apiError: error.response.data.message });
        }
      }
    } else {
      console.log("login data:", { email, password });
    }
  };

  return (
    <div className="page-wrapper">
      {/* Background Ambient Glows */}
      <div className="glow-1"></div>
      <div className="glow-2"></div>

      <div className="login-card">
        {/* Top Gold Accent Strip */}
        <div className="card-top-accent"></div>

        {/* Brand Header with custom uploaded Logo */}
        <div className="brand-header">
          <div className="brand-logo-container">
            <img src={logo} alt="Sesame Solutions Logo" className="brand-logo-img" />
          </div>
          <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="subtext">
            {isSignup
              ? "Sign up to start managing your portal"
              : "Enter your credentials to access your workspace"}
          </p>
        </div>

        {error.apiError && <p className="error api-error">{error.apiError}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {error.name && <p className="error">{error.name}</p>}
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {error.email && <p className="error">{error.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error.password && <p className="error">{error.password}</p>}
          </div>

          {isSignup && (
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {error.confirmPassword && (
                <p className="error">{error.confirmPassword}</p>
              )}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isSignup ? "Get Started" : "Sign In"}
          </button>
        </form>

        <div className="toggle-footer">
          <span>
            {isSignup ? "Already have an account?" : "New to Sesame Solutions?"}
          </span>
          <button
            type="button"
            className="toggle-btn"
            onClick={() => {
              setIsSignup(!isSignup);
              setError({});
            }}
          >
            {isSignup ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;