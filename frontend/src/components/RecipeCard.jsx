import { Link } from "react-router-dom";
import Card from "./UI/Card";

export default function RecipeCard({ recipe, showActions = false, onDelete }) {
  const { id, title, rating, calories, protein_g, cook_time, review, is_public } = recipe;

  return (
    <Card>
      <div style={{ display: "flex", gap: "var(--spacing-sm)", alignItems: "center", marginBottom: "var(--spacing-xs)" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {is_public !== undefined && (
          <span style={{ marginLeft: "auto", fontSize: 12 }}>
            {is_public ? "🌍 Public" : "🔒 Private"}
          </span>
        )}
      </div>

      <p style={{ margin: "var(--spacing-xs) 0", fontSize: 13 }}>
        ⭐ {rating ?? "—"} | {calories ?? "—"} cal | {protein_g ?? "—"}g protein
        {cook_time && ` | cook: ${cook_time} min`}
      </p>

      {review && <p style={{ margin: "var(--spacing-xs) 0", color: "#666" }}>{review}</p>}

      {showActions && (
        <div style={{ display: "flex", gap: "var(--spacing-sm)", marginTop: "var(--spacing-xs)" }}>
          <Link to={`/recipes/${id}`}>View</Link>
          <Link to={`/recipes/${id}/edit`}>Edit</Link>
          <button onClick={() => onDelete?.(id)} style={{ marginLeft: "auto" }}>
            Delete
          </button>
        </div>
      )}
    </Card>
  );
}
