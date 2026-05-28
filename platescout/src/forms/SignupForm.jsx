import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Forms.css";
import { apiUrl } from "../util/api";

// Assignment 7 — Signup route.
// Same shape as A6. The only thing new is that we now save TWO things to
// localStorage on success — the user (as before) AND a JWT the server signs.
function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username || username.trim().length < 3) {
      return "Username must be at least 3 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        const message = data.error || "Signup failed.";
        setError(message);
        toast.error(message);
        return;
      }


      //   - The server returned BOTH a user object AND a token string in this response:
      //       data.user   →  { username, email }
      //       data.token  →  a JWT string (long, starts with "eyJ")
      //   - Save data.user under the key  "User"  (same as A6).
      //   - Save data.token under the key  "token"  (NEW for A7).
      //   - Both go in as JSON-stringified strings for User; the token is already a string.
      //
      //   The ProtectedRoute we build later reads  localStorage.token  to decide
      //   whether the user is logged in, so it MUST be saved here for the redirect
      //   to work after a successful signup.

      localStorage.setItem("User", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      toast.success(data.message || "Signup successful.");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      const message = "Network error. Is the server running?";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      {error && <p className="Form-error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Sign up</button>
      <p className="Form-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default SignupForm;
