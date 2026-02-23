import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  
  // Hide TopNav on full-screen pages (landing, auth)
  const hideNav = ['/', '/login', '/register'].includes(location.pathname);
  
  if (hideNav) return null;

  return (
    <nav style={navStyles.container}>
      <div style={navStyles.content}>
        <div style={navStyles.left}>
          <Link to="/" style={navStyles.logo}>
            <div style={navStyles.logoIcon} />
            <span style={navStyles.logoText}>BiteBoxd</span>
          </Link>
          <Link to="/feed" style={navStyles.navLink}>Feed</Link>
          {isAuthed && <Link to="/recipes" style={navStyles.navLink}>My Recipes</Link>}
        </div>
        <div style={navStyles.right}>
          {isAuthed ? (
            <button onClick={logout} style={navStyles.logoutButton}>
              Logout
            </button>
          ) : (
            <div style={navStyles.authLinks}>
              <Link to="/login" style={navStyles.loginLink}>Login</Link>
              <Link to="/register" style={navStyles.signupButton}>Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const navStyles = {
  container: {
    background: "linear-gradient(135deg, #A94438 0%, #D24545 100%)",
    borderBottom: "1px solid rgba(228, 222, 190, 0.2)",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    maxWidth: 1400,
    margin: "0 auto",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "white",
    fontWeight: 900,
    fontSize: 20,
    letterSpacing: -0.5,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  logoText: {
    color: "white",
  },
  navLink: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 15,
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: 8,
    transition: "all 0.2s",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  authLinks: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  loginLink: {
    textDecoration: "none",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    padding: "8px 16px",
  },
  signupButton: {
    textDecoration: "none",
    color: "#A94438",
    fontSize: 15,
    fontWeight: 700,
    padding: "10px 20px",
    background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
    borderRadius: 8,
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  logoutButton: {
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    padding: "10px 20px",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

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
