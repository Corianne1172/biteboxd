import { useNavigate } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";
import PageContainer from "../components/UI/PageContainer";

export default function NewRecipe() {
  const nav = useNavigate();

  const create = async (payload) => {
    const res = await api.post("/recipes", payload);
    nav(`/recipes/${res.data.id}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#333" }}>
      <PageContainer>
        <h2 style={{ color: "#A94438" }}>New Recipe</h2>
        <RecipeForm onSubmit={create} submitLabel="Create" />
      </PageContainer>
    </div>
  );
}