import { useCallback, useEffect, useState } from "@/react.shim.ts";
import { isBrowser } from "@/utils.ts";
import { useRequestContext } from "@/server/renderer.ts";

export type Variant = "danger" | "warning" | "success" | "neutral";

export const validThemes = ["dark", "light"] as const;
export type Theme = typeof validThemes[number];

export function getTheme() {
  if (isBrowser()) {
    return document.documentElement.dataset.theme as Theme;
  } else {
    return useRequestContext().get("theme") || "dark";
  }
}

export function useTheme(): [Theme | undefined, () => void] {
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    if (theme) {
      console.log("theme", theme);
      document.cookie = `theme=${theme};max-age=31536000`;
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setThemeState(nextTheme);
  }, [theme]);

  return [theme, toggleTheme];
}
