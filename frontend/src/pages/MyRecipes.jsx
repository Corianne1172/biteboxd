import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function MyRecipes() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await api.get("/recipes");
      setItems(res.data ?? []);
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
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0 }}>My Recipes</h2>
        <Link to="/recipes/new" style={{ marginLeft: "auto" }}>
          + New Recipe
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {items.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 10,
              display: "grid",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>{r.title}</h3>
              <span style={{ marginLeft: "auto", fontSize: 12 }}>
                {r.is_public ? "🌍 Public" : "🔒 Private"}
              </span>
            </div>

            <div style={{ fontSize: 13 }}>
              ⭐ {r.rating ?? "—"} | {r.calories ?? "—"} cal |{" "}
              {r.protein_g ?? "—"}g protein | cook: {r.cook_time ?? "—"} min
            </div>

            {r.review && <div style={{ color: "#333" }}>{r.review}</div>}

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Link to={`/recipes/${r.id}`}>View</Link>
              <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
              <button onClick={() => onDelete(r.id)} style={{ marginLeft: "auto" }}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {!loading && items.length === 0 && (
          <p>You have no recipes yet. Click “New Recipe” to add one.</p>
        )}
      </div>
    </div>
  );
}