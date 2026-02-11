import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setItem(res.data);
      } catch {
        setErr("Failed to load recipe.");
      }
    })();
  }, [id]);

  const save = async (payload) => {
    await api.put(`/recipes/${id}`, payload);
    nav(`/recipes/${id}`);
  };

  if (err) return <div style={{ padding: 24 }}><p style={{ color: "red" }}>{err}</p></div>;
  if (!item) return <div style={{ padding: 24 }}><p>Loading…</p></div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Edit Recipe</h2>
      <RecipeForm initial={item} onSubmit={save} submitLabel="Save" />
    </div>
  );
}