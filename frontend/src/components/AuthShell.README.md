# AuthShell Component

A responsive 2-column layout component designed for authentication pages.

## Features

- **Full viewport layout** - Takes up entire screen (100vh × 100vw)
- **Responsive design**
  - Desktop (>900px): Side-by-side columns
  - Mobile (≤900px): Stacked vertically
- **Flexible left column** - Min 360px, max 520px width
- **Auto-filling right column** - Takes remaining space
- **CSS variable integration** - Uses `--bg`, `--ink`, `--card`, `--border`, `--muted`

## Props

| Prop | Type | Description |
|------|------|-------------|
| `left` | ReactNode | Content for left column (auth form, etc.) |
| `right` | ReactNode | Content for right column (branding, images, etc.) |
| `children` | ReactNode | Alternative to `left` prop - used when only left content needed |

## Usage

### Two-column layout (recommended for auth pages)

```jsx
import AuthShell from "./components/AuthShell";

function LoginPage() {
  return (
    <AuthShell
      left={
        <div style={{ maxWidth: 400 }}>
          <h2>Sign In</h2>
          <form>{/* Your form here */}</form>
        </div>
      }
      right={
        <div>
          <h1>Welcome Back!</h1>
          <p>Your marketing copy or branding here</p>
        </div>
      }
    />
  );
}
```

### Single column (centered content)

```jsx
function SimpleAuth() {
  return (
    <AuthShell>
      <div>
        <h2>Forgot Password</h2>
        <p>Enter your email below</p>
      </div>
    </AuthShell>
  );
}
```

## Responsive Behavior

- **Desktop (>900px)**
  - Left column: Fixed width between 360-520px, centered content
  - Right column: Fills remaining space
  - Both columns scrollable independently if content overflows

- **Mobile (≤900px)**
  - Left column: Full width, centered, min 100vh
  - Right column: Full width, stacked below, min 50vh
  - Smooth transition between breakpoints

## Styling

The component uses inline styles following the project pattern and leverages CSS variables:

- `--bg` - Main background color
- `--ink` - Primary text color
- `--card` - Card/panel background
- `--border` - Border color
- `--muted` - Muted text color
- `--spacing-lg` - Large spacing unit

All variables are defined in `src/index.css`.

## Implementation Details

- Uses `useState` and `useEffect` for responsive behavior
- Listens to window resize events
- Cleans up event listeners on unmount
- 900px breakpoint threshold
- No external dependencies
