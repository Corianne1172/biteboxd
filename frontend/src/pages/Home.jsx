import { Link } from "react-router-dom";
import PageContainer from "../components/UI/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <h1>BiteBoxd</h1>
      <p>Log recipes. Rate them. Track macros. Share with the world.</p>
      <div style={{ display: "flex", gap: "var(--spacing-md)", marginTop: "var(--spacing-md)" }}>
        <Link to="/feed">Explore Feed</Link>
        <Link to="/recipes">My Recipes</Link>
      </div>
    </PageContainer>
  );
}