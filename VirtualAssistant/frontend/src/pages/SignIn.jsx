import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EyeIcon({ open }) {
  return open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.64 19.64 0 0 1 5-5M1 1l22 22" />
      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
      <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
    </svg>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign in failed");
      } else {
        // Redirect to dashboard or home page after successful login
        navigate("/dashboard");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={styles.background} />
      <div style={styles.overlay} />

      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit} aria-label="Sign In form">
          <h1 style={styles.title}>Welcome Back</h1>

          {error && (
            <p style={styles.error} role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <label style={styles.label} htmlFor="email">
            Email Address
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            autoComplete="email"
          />

          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              style={{ ...styles.input, paddingRight: "45px" }}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-required="true"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={styles.showPasswordBtn}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          <button
            type="submit"
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p style={styles.signUpText}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.signUpLink}>
              Create one
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80";

const styles = {
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(8px)",
    zIndex: 0,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  formContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    width: "100%",
    maxWidth: "420px",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  form: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "40px 35px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "30px",
    fontWeight: "700",
    fontSize: "1.8rem",
    color: "#222",
    textAlign: "center",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "8px",
    marginTop: "15px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1.5px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  showPasswordBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555",
  },
  button: {
    marginTop: "30px",
    width: "100%",
    padding: "14px 0",
    borderRadius: "10px",
    backgroundColor: "#4a47a3",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.1rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonDisabled: {
    backgroundColor: "#6c69b6",
    cursor: "not-allowed",
  },
  signUpText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#555",
  },
  signUpLink: {
    color: "#4a47a3",
    textDecoration: "none",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default SignIn;
