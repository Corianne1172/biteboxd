# BiteBoxd Frontend Components Summary

Quick reference for all reusable components in the project.

## 🎨 UI Components (`/components/UI/`)

### Layout Components
- **`PageContainer`** - Standard page wrapper with consistent padding
- **`AuthShell`** - 2-column responsive auth layout (360-520px + flexible)
- **`Card`** - Reusable card container with border and radius

### Feedback Components
- **`ErrorMessage`** - Conditional error display with styled background
- **`LoadingMessage`** - Simple loading state indicator

### Form Components
- **`FormField`** - Label + input wrapper with consistent spacing
- **`Input`** - Standard input element
- **`TextArea`** - Multi-line text input

### Visual Components
- **`RecipeCollage`** - Non-interactive floating recipe cards (auth backgrounds)

## 🍽️ Feature Components (`/components/`)

### Recipe Components
- **`RecipeCard`** - Unified recipe display with optional actions (View/Edit/Delete)
- **`RecipeForm`** - Complete form for creating/editing recipes

### Auth Components (`/components/Auth/`)
- **`BgRecipeCard`** - Background decorative recipe preview
- **`PasswordRules`** - Password validation UI with checkmarks

## 📦 Quick Import

```jsx
// UI Components
import {
  PageContainer,
  AuthShell,
  Card,
  ErrorMessage,
  LoadingMessage,
  FormField,
  Input,
  TextArea,
  RecipeCollage,
} from "./components/UI";

// Feature Components
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

// Auth Components
import BgRecipeCard from "./components/Auth/BgRecipeCard";
import PasswordRules from "./components/Auth/PasswordRules";
```

## 🎨 CSS Variables

All defined in `src/index.css`:

### Colors
```css
--olive: #8A8635
--deepRed: #AA2B1D
--orange: #CC561E
--cream: #F3CF7A
--ink: #14120f
--card: #1b1813
--bg: #242424
--border: rgba(243,207,122,0.22)
--muted: rgba(243,207,122,0.75)
```

### Spacing
```css
--spacing-xs: 6px
--spacing-sm: 10px
--spacing-md: 12px
--spacing-lg: 24px
```

### Border Radius
```css
--radius-sm: 8px
--radius-md: 10px
--radius-lg: 16px
```

## 📁 File Structure

```
frontend/src/
├── components/
│   ├── UI/
│   │   ├── PageContainer.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingMessage.jsx
│   │   ├── Card.jsx
│   │   ├── FormField.jsx
│   │   └── index.js ← Main export
│   ├── Auth/
│   │   ├── BgRecipeCard.jsx
│   │   └── PasswordRules.jsx
│   ├── AuthShell.jsx (new)
│   ├── RecipeCollage.jsx (new)
│   ├── RecipeCard.jsx
│   └── RecipeForm.jsx
├── pages/ (all refactored)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Feed.jsx
│   ├── MyRecipes.jsx
│   ├── NewRecipe.jsx
│   ├── EditRecipe.jsx
│   └── RecipeDetail.jsx
└── index.css (CSS variables)
```

## 🚀 Common Patterns

### Simple Page
```jsx
import PageContainer from "./components/UI/PageContainer";
import ErrorMessage from "./components/UI/ErrorMessage";

function MyPage() {
  const [err, setErr] = useState("");
  
  return (
    <PageContainer>
      <h2>Page Title</h2>
      <ErrorMessage>{err}</ErrorMessage>
      {/* content */}
    </PageContainer>
  );
}
```

### Auth Page
```jsx
import { AuthShell, RecipeCollage } from "./components/UI";

function LoginPage() {
  return (
    <AuthShell
      left={<YourForm />}
      right={<RecipeCollage />}
    />
  );
}
```

### Recipe List
```jsx
import RecipeCard from "./components/RecipeCard";

function RecipeList({ recipes, onDelete }) {
  return recipes.map(r => (
    <RecipeCard 
      key={r.id} 
      recipe={r} 
      showActions 
      onDelete={onDelete} 
    />
  ));
}
```

## ✅ Component Status

| Component | Status | Linted | Documented |
|-----------|--------|--------|------------|
| PageContainer | ✅ | ✅ | ✅ |
| ErrorMessage | ✅ | ✅ | ✅ |
| LoadingMessage | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ |
| FormField | ✅ | ✅ | ✅ |
| AuthShell | ✅ | ✅ | ✅ |
| RecipeCollage | ✅ | ✅ | ✅ |
| RecipeCard | ✅ | ✅ | ✅ |
| RecipeForm | ✅ | ✅ | ✅ |
| BgRecipeCard | ✅ | ✅ | ✅ |
| PasswordRules | ✅ | ✅ | ✅ |

## 📚 Documentation Files

- `REFACTORING_SUMMARY.md` - Initial refactoring overview
- `AUTH_COMPONENTS_GUIDE.md` - AuthShell + RecipeCollage guide
- `components/AuthShell.README.md` - AuthShell docs
- `components/RecipeCollage.README.md` - RecipeCollage docs
- `components/*.example.jsx` - Usage examples

## 🔧 Build Info

- Vite v7.3.0
- Bundle: 287KB JS (93.5KB gzipped)
- CSS: 1.69KB (0.76KB gzipped)
- No linter errors
- All components tested
