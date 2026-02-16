import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";
import PageContainer from "../components/UI/PageContainer";
import ErrorMessage from "../components/UI/ErrorMessage";
import LoadingMessage from "../components/UI/LoadingMessage";

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

  if (err) return <PageContainer><ErrorMessage>{err}</ErrorMessage></PageContainer>;
  if (!item) return <PageContainer><LoadingMessage /></PageContainer>;

  return (
    <PageContainer>
      <h2>Edit Recipe</h2>
      <RecipeForm initial={item} onSubmit={save} submitLabel="Save" />
    </PageContainer>
  );
}