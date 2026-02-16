import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import PageContainer from "../components/UI/PageContainer";
import ErrorMessage from "../components/UI/ErrorMessage";
import LoadingMessage from "../components/UI/LoadingMessage";
import Card from "../components/UI/Card";

export default function RecipeDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setErr("");
    try {
      const res = await api.get(`/recipes/${id}`);
      setItem(res.data);
    } catch {
      setErr("Failed to load recipe.");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onUpload = async (file) => {
    setUploadErr("");
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      await api.post(`/recipes/${id}/photo`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await load();
    } catch {
      setUploadErr("Upload failed. Make sure it's an image file.");
    } finally {
      setUploading(false);
    }
  };

  if (err) return <PageContainer><ErrorMessage>{err}</ErrorMessage></PageContainer>;
  if (!item) return <PageContainer><LoadingMessage /></PageContainer>;

  const photoPath = item.photo_url;

  return (
    <PageContainer>
      <div style={{ display: "grid", gap: "var(--spacing-md)" }}>
        <div style={{ display: "flex", gap: "var(--spacing-sm)", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>{item.title}</h2>
          <span style={{ marginLeft: "auto" }}>{item.is_public ? "🌍 Public" : "🔒 Private"}</span>
        </div>

        <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
          <Link to="/recipes">← Back</Link>
          <Link to={`/recipes/${id}/edit`}>Edit</Link>
        </div>

        <Card>
          <p style={{ margin: 0 }}><b>Author:</b> {item.author ?? "—"}</p>
          <p style={{ margin: 0 }}><b>Cook time:</b> {item.cook_time ?? "—"} min</p>
          <p style={{ margin: 0 }}><b>Cuisine:</b> {item.cuisine ?? "—"}</p>
          <p style={{ margin: 0 }}><b>Difficulty:</b> {item.difficulty ?? "—"}</p>
        </Card>

        {item.description && (
          <div>
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>
        )}

        {item.instructions && (
          <div>
            <h3>Instructions</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{item.instructions}</pre>
          </div>
        )}

        <Card>
          <h3 style={{ marginTop: 0 }}>Macros</h3>
          <p style={{ margin: 0 }}>
            {item.calories ?? "—"} cal | {item.protein_g ?? "—"}g protein |{" "}
            {item.carbs_g ?? "—"}g carbs | {item.fat_g ?? "—"}g fat
          </p>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Rating & Review</h3>
          <p style={{ margin: 0 }}>⭐ {item.rating ?? "—"}</p>
          <p style={{ margin: "var(--spacing-xs) 0 0" }}>{item.review ?? "—"}</p>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Photo</h3>

          {photoPath ? (
            <p style={{ marginTop: 0 }}>
              Saved path: <code>{photoPath}</code>
            </p>
          ) : (
            <p style={{ marginTop: 0 }}>No photo uploaded yet.</p>
          )}

          <ErrorMessage>{uploadErr}</ErrorMessage>

          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => onUpload(e.target.files?.[0])}
          />

          {uploading && <LoadingMessage>Uploading…</LoadingMessage>}
        </Card>
      </div>
    </PageContainer>
  );
}