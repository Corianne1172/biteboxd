import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>BiteBoxd</h1>
      <p>Log recipes. Rate them. Track macros. Share with the world.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Link to="/feed">Explore Feed</Link>
        <Link to="/recipes">My Recipes</Link>
      </div>
    </div>
  );
}