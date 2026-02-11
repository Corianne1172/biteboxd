import { useNavigate } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";

export default function NewRecipe() {
  const nav = useNavigate();

  const create = async (payload) => {
    const res = await api.post("/recipes", payload);
    nav(`/recipes/${res.data.id}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>New Recipe</h2>
      <RecipeForm onSubmit={create} submitLabel="Create" />
    </div>
  );
}