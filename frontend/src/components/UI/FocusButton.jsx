import { useState } from "react";

export default function FocusButton({ variant = "primary", style, children, disabled, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = {
    padding: "12px 14px",
    borderRadius: "var(--radius-md)",
    fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "opacity 0.2s, transform 0.2s, outline 0.2s",
    fontSize: 16,
    width: "100%",
    boxSizing: "border-box",
  };

  const variantStyles = {
    primary: {
      border: "none",
      background: "linear-gradient(135deg, var(--color-cream), var(--color-orange))",
      color: "#1a130a",
    },
    secondary: {
      border: "1px solid var(--color-line)",
      background: "rgba(20,18,15,0.5)",
      color: "var(--color-cream)",
    },
  };

  const focusStyle = isFocused && !disabled ? {
    outline: variant === "primary" ? "3px solid var(--color-cream)" : "2px solid var(--color-cream)",
    outlineOffset: "2px",
    transform: variant === "primary" ? "scale(1.02)" : "scale(1.01)",
    ...(variant === "secondary" && { borderColor: "var(--color-cream)" }),
  } : {};

  return (
    <button
      {...props}
      disabled={disabled}
      style={{ ...baseStyle, ...variantStyles[variant], ...style, ...focusStyle }}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
    >
      {children}
    </button>
  );
}
