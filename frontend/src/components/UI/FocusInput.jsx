import { useState } from "react";

export default function FocusInput({ style, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = {
    padding: "11px 12px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--theme-input-border)",
    background: "var(--theme-input-bg)",
    color: "var(--theme-text)",
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
    transition: "outline 0.2s, border-color 0.2s",
    ...style,
  };

  const focusStyle = isFocused ? {
    outline: "2px solid var(--palette-maroon)",
    outlineOffset: "2px",
    borderColor: "var(--palette-maroon)",
  } : {};

  return (
    <input
      {...props}
      style={{ ...baseStyle, ...focusStyle }}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
    />
  );
}
