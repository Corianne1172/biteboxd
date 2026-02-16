import { useEffect, useState } from "react";
import api from "../api/client";
import PageContainer from "../components/UI/PageContainer";
import ErrorMessage from "../components/UI/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import { Input } from "../components/UI/FormField";

export default function Feed() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [minProtein, setMinProtein] = useState("");
  const [maxCalories, setMaxCalories] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const params = {
        limit: 20,
        offset: 0,
        q: q || undefined,
        min_protein: minProtein ? Number(minProtein) : undefined,
        max_calories: maxCalories ? Number(maxCalories) : undefined,
      };
      const res = await api.get("/feed", { params });
      setItems(res.data.items ?? res.data ?? []);
    } catch {
      setErr("Failed to load feed. Is the backend running on 8001?");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <PageContainer>
      <h2>Public Feed</h2>
      <ErrorMessage>{err}</ErrorMessage>

      <div style={{ display: "flex", gap: "var(--spacing-sm)", flexWrap: "wrap", margin: "var(--spacing-md) 0" }}>
        <Input placeholder="search title..." value={q} onChange={(e) => setQ(e.target.value)} />
        <Input placeholder="min protein" value={minProtein} onChange={(e) => setMinProtein(e.target.value)} />
        <Input placeholder="max calories" value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} />
        <button onClick={load}>Apply</button>
      </div>

      <div style={{ display: "grid", gap: "var(--spacing-md)" }}>
        {items.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </PageContainer>
  );
}