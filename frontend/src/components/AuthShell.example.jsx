import AuthShell from "./AuthShell";

// Example usage of AuthShell component

function AuthShellExample() {
  return (
    <AuthShell
      left={
        <div style={{ maxWidth: 400, width: "100%" }}>
          <h2>Sign In</h2>
          <form style={{ display: "grid", gap: "var(--spacing-md)" }}>
            <input placeholder="Email" type="email" />
            <input placeholder="Password" type="password" />
            <button type="submit">Log In</button>
          </form>
        </div>
      }
      right={
        <div style={{ maxWidth: 600, textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "var(--spacing-lg)" }}>
            Welcome to BiteBoxd
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--muted)" }}>
            Rate recipes like movies. Track macros like a pro.
          </p>
        </div>
      }
    />
  );
}

// Alternative usage with just left content
function SimpleAuthShell() {
  return (
    <AuthShell>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <h2>Sign In</h2>
        <p>Simple centered form</p>
      </div>
    </AuthShell>
  );
}

export { AuthShellExample, SimpleAuthShell };
