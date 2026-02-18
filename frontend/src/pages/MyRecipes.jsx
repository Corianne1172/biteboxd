import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import PageContainer from "../components/UI/PageContainer";
import ErrorMessage from "../components/UI/ErrorMessage";
import LoadingMessage from "../components/UI/LoadingMessage";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipes() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await api.get("/recipes");
      const recipes = res.data ?? [];
      setItems(recipes);
      
      // Redirect to create recipe if user has no recipes
      if (!loading && recipes.length === 0) {
        setTimeout(() => nav("/recipes/new"), 100);
      }
    } catch {
      setErr("Failed to load your recipes. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      await load();
    } catch {
      alert("Delete failed.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#333" }}>
      <PageContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
          <h2 style={{ margin: 0, color: "#A94438" }}>My Recipes</h2>
          <Link to="/recipes/new" style={{ marginLeft: "auto" }}>
            + New Recipe
          </Link>
        </div>

        {loading && <LoadingMessage />}
        <ErrorMessage>{err}</ErrorMessage>

        <div style={{ display: "grid", gap: "var(--spacing-md)", marginTop: "var(--spacing-md)" }}>
          {items.map((r) => (
            <RecipeCard key={r.id} recipe={r} showActions onDelete={onDelete} />
          ))}

          {!loading && items.length === 0 && (
            <p>You have no recipes yet. Click "New Recipe" to add one.</p>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
