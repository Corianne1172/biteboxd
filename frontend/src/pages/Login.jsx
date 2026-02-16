import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageContainer from "../components/UI/PageContainer";
import ErrorMessage from "../components/UI/ErrorMessage";
import { FormField, Input } from "../components/UI/FormField";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/recipes");
    } catch {
      setErr("Login failed. Check your credentials.");
    }
  };

  return (
    <PageContainer>
      <div style={{ maxWidth: 420 }}>
        <h2>Login</h2>
        <ErrorMessage>{err}</ErrorMessage>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: "var(--spacing-sm)" }}>
          <FormField>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          </FormField>
          <FormField>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
          </FormField>
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: "var(--spacing-md)" }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </PageContainer>
  );
}