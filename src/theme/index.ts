import { useCallback, useEffect, useMemo, useState } from "@/react.shim.ts";
import { isBrowser } from "@/utils.ts";
import { useRequestContext } from "@/server/context.ts";

export type Intent = "danger" | "warning" | "success" | "neutral" | "accent";

export const validThemes = ["dark", "light"] as const;
export type Theme = (typeof validThemes)[number];

export function getTheme() {
  if (isBrowser()) {
    return document.documentElement.dataset.theme as Theme;
  } else {
    return useRequestContext().get("theme") || "dark";
  }
}

export function useTheme(observer = false): [Theme | undefined, () => void] {
  const [theme, setThemeState] = useState(getTheme());

  const nextTheme = useMemo(
    () => (theme === "dark" ? "light" : "dark"),
    [theme],
  );

  useEffect(() => {
    if (theme && isBrowser()) {
      if (observer) {
        const o = new MutationObserver(() => {
          o.disconnect();
          setThemeState(nextTheme);
        });
        o.observe(document.documentElement, {
          attributeFilter: ["data-theme"],
        });

        return () => o.disconnect();
      } else {
        console.log("theme", theme);
        document.cookie = `theme=${theme};path=/;max-age=31536000`;
      }
    }
  }, [theme, nextTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, [nextTheme]);

  return [theme, toggleTheme];
}
