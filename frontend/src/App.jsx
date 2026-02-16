import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyRecipes from "./pages/MyRecipes";
import NewRecipe from "./pages/NewRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetail from "./pages/RecipeDetail";

function Protected({ children }) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
}

function TopNav() {
  const { isAuthed, logout } = useAuth();

  return (
    <div style={{ padding: "var(--spacing-md)", borderBottom: "var(--border-light)", display: "flex", gap: "var(--spacing-md)" }}>
      <Link to="/">BiteBoxd</Link>
      <Link to="/feed">Feed</Link>
      {isAuthed && <Link to="/recipes">My Recipes</Link>}
      <div style={{ marginLeft: "auto" }}>
        {isAuthed ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <span style={{ display: "flex", gap: "var(--spacing-sm)" }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </span>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/recipes" element={<Protected><MyRecipes /></Protected>} />
          <Route path="/recipes/new" element={<Protected><NewRecipe /></Protected>} />
          <Route path="/recipes/:id" element={<Protected><RecipeDetail /></Protected>} />
          <Route path="/recipes/:id/edit" element={<Protected><EditRecipe /></Protected>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
