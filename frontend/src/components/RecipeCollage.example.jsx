import AuthShell from "./AuthShell";
import RecipeCollage from "./RecipeCollage";

// Example: Using RecipeCollage with AuthShell

export default function AuthPageWithCollage() {
  return (
    <AuthShell
      left={
        <div style={{ maxWidth: 400, width: "100%" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>BiteBoxd</h1>
          <p style={{ color: "var(--muted)", marginBottom: 24 }}>
            Rate recipes like movies. Track macros like a pro.
          </p>
          
          <form style={{ display: "grid", gap: 12 }}>
            <input placeholder="Email" type="email" />
            <input placeholder="Password" type="password" />
            <button type="submit">Sign In</button>
          </form>
          
          <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)" }}>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}
