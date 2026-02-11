import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const rules = useMemo(() => {
    return {
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password),
    };
  }, [password]);

  const passwordOk = rules.length && rules.letter && rules.number;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!passwordOk) {
      setErr("Password must be at least 8 characters and include a letter and a number.");
      return;
    }

    try {
      await register(username, email, password);
      nav("/login");
    } catch (e) {
      const msg = e?.response?.data?.error?.message || "Register failed.";
      setErr(msg);
    }
  };

  const ruleLine = (ok, text) => (
    <div style={{ color: ok ? "green" : "crimson" }}>
      {ok ? "✓" : "•"} {text}
    </div>
  );

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h2>Register</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />

        <div style={{ fontSize: 13, lineHeight: 1.4 }}>
          {ruleLine(rules.length, "At least 8 characters")}
          {ruleLine(rules.letter, "Contains a letter (A–Z)")}
          {ruleLine(rules.number, "Contains a number (0–9)")}
        </div>

        <button type="submit" disabled={!passwordOk}>
          Create account
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
