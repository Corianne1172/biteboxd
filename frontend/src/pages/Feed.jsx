import { useEffect, useState } from "react";
import api from "../api/client";

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
    <div style={{ padding: 24 }}>
      <h2>Public Feed</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
        <input placeholder="search title..." value={q} onChange={(e) => setQ(e.target.value)} />
        <input placeholder="min protein" value={minProtein} onChange={(e) => setMinProtein(e.target.value)} />
        <input placeholder="max calories" value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} />
        <button onClick={load}>Apply</button>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
            <h3 style={{ margin: 0 }}>{r.title}</h3>
            <p style={{ margin: "6px 0" }}>
              ⭐ {r.rating ?? "—"} | {r.calories ?? "—"} cal | {r.protein_g ?? "—"}g protein
            </p>
            {r.review && <p style={{ margin: 0 }}>{r.review}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}