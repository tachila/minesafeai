import { useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase.js";
import { signUp } from "./signup.js";
import { logIn } from "./login.js";

import minegb from "./assets/mine.jpeg";
import Quiz from "./Quiz.jsx";
import ApplicantDashboard from "./components/ApplicantDashboard.jsx";
import MinerDashboard from "./components/MinerDashboard.jsx";

import "./App.css";

const EMPTY_FORM = {
  firstname: "",
  lastname: "",
  email: "",
  dateOfBirth: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "applicant",
  miningId: "",
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [miningId, setMiningId] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Registration fields
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          setUserRole(
            userSnap.exists() ? userSnap.data().role || "applicant" : "applicant"
          );
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setUserRole("applicant");
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must contain at least 6 characters.");
          return;
        }

        await signUp(formData.email.trim(), formData.password, {
          firstname: formData.firstname.trim(),
          lastname: formData.lastname.trim(),
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phone.trim(),
          role: formData.role,
          miningId: formData.miningId.trim(),
        });
      } else {
        await logIn(email.trim(), password, miningId.trim());
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsQuizActive(false);
  };

  const switchForm = () => {
    setIsSignUp((previous) => !previous);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setMiningId("");
    setShowPassword(false);
    setFormData(EMPTY_FORM);
  };

  if (loading) {
    return <div className="auth-loading">Loading MineSafe AI...</div>;
  }

  if (currentUser) {
    if (userRole === "applicant" && isQuizActive) {
      return <Quiz onFinish={() => setIsQuizActive(false)} />;
    }

    if (userRole === "applicant") {
      return (
        <ApplicantDashboard
          email={currentUser.email}
          onStartQuiz={() => setIsQuizActive(true)}
          onLogout={handleLogout}
        />
      );
    }

    if (userRole === "miner") {
      return <MinerDashboard email={currentUser.email} onLogout={handleLogout} />;
    }

    return <div className="auth-loading">Loading your dashboard...</div>;
  }

  return (
    <main className="auth-page">
      {/* Full-screen image background: reuses the existing mining photo. */}
      <img
        src={minegb}
        alt=""
        aria-hidden="true"
        className="auth-page-background"
      />
      <div className="auth-page-overlay" aria-hidden="true" />

      {/* Centered two-column glassmorphism card. */}
      <div className="auth-card">
        <section className="auth-visual">
          <div className="auth-brand">
            <div className="auth-brand-icon">M</div>
            <span>
              MineSafe <strong>AI</strong>
            </span>
          </div>

          <div className="auth-hero-content">
            <span className="auth-eyebrow">SAFER MINES. SMARTER MINERS.</span>
            <h1>
              Building a safer
              <span> mining future.</span>
            </h1>
            <p>
              Learn, prepare and improve your mining safety knowledge through a
              modern digital training platform.
            </p>
            <div className="auth-feature">
              <span>✓</span> Professional mining safety training
            </div>
            <div className="auth-feature">
              <span>✓</span> Interactive learning and assessments
            </div>
            <div className="auth-feature">
              <span>✓</span> Track your training progress
            </div>
          </div>

          <div className="auth-image-footer">
            MINE SAFETY • TRAINING • AWARENESS
          </div>
        </section>

        <section className="auth-form-side">
          <div className="auth-form-container">
            <div className="mobile-brand">
              <div className="auth-brand-icon">M</div>
              <span>
                MineSafe <strong>AI</strong>
              </span>
            </div>

            <div className="auth-heading">
              <span className="auth-small-heading">
                {isSignUp ? "JOIN MINESAFE AI" : "WELCOME BACK"}
              </span>
              <h2>
                {isSignUp ? "Create your account" : "Sign in to your account"}
              </h2>
              <p>
                {isSignUp
                  ? `Enter your details below to register as a ${formData.role}.`
                  : "Enter your account details to access your portal."}
              </p>
            </div>

            {error && (
              <div className="auth-message error-message" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="auth-message success-message" role="status">
                {success}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignUp ? (
                <>
                  <div className="form-field">
                    <label htmlFor="account-role">Register as</label>
                    <select
                      id="account-role"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="applicant">Applicant</option>
                      <option value="miner">Miner</option>
                    </select>
                  </div>

                  {formData.role === "miner" && (
                    <div className="form-field">
                      <label htmlFor="signup-mining-id">Mining ID</label>
                      <input
                        id="signup-mining-id"
                        type="text"
                        name="miningId"
                        placeholder="Enter your Mining ID"
                        value={formData.miningId}
                        onChange={handleFormChange}
                        autoComplete="off"
                        required
                      />
                      <small className="field-hint">
                        Enter your official mining identification number.
                      </small>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="firstname">First name</label>
                      <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        placeholder="Enter first name"
                        value={formData.firstname}
                        onChange={handleFormChange}
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="lastname">Last name</label>
                      <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        placeholder="Enter last name"
                        value={formData.lastname}
                        onChange={handleFormChange}
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="signup-email">Email address</label>
                    <input
                      id="signup-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleFormChange}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleFormChange}
                      autoComplete="bday"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      autoComplete="tel"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="signup-password">Password</label>
                      <input
                        id="signup-password"
                        type="password"
                        name="password"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleFormChange}
                        autoComplete="new-password"
                        minLength={6}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="confirmPassword">Confirm password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat password"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                        autoComplete="new-password"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-field">
                    <label htmlFor="login-email">Email address</label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="login-mining-id">
                      Mining ID <span className="optional-label">Miners only</span>
                    </label>
                    <input
                      id="login-mining-id"
                      type="text"
                      placeholder="Enter your registered Mining ID (leave blank if applicant)"
                      value={miningId}
                      onChange={(event) => setMiningId(event.target.value)}
                      autoComplete="off"
                    />
                    <small className="field-hint">
                      Applicants can leave this field blank. Miners must enter
                      their registered Mining ID.
                    </small>
                  </div>

                  <div className="form-field">
                    <label htmlFor="login-password">Password</label>
                    <div className="password-wrapper">
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                      />
                      <button
                        className="password-toggle"
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="auth-extra">
                    <label>
                      <input type="checkbox" /> Remember me
                    </label>
                    <span
                      className="forgot-password"
                      title="Password reset can be connected next"
                    >
                      Forgot password?
                    </span>
                  </div>
                </>
              )}

              <button type="submit" className="auth-submit">
                {isSignUp ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="auth-switch">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}
              <button type="button" onClick={switchForm}>
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </div>

            <p className="auth-terms">
              By using MineSafe AI, you agree to use the platform responsibly and
              provide accurate account information.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
