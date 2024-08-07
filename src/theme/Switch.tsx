import { BaseButton } from "@/components/Button.tsx";
import Icon from "@/components/Icon.tsx";
import { useTheme } from "@/theme/index.ts";

export const Switch = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <BaseButton
      className="border-none"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Icon.ThemeLight /> : <Icon.ThemeDark />}
    </BaseButton>
  );
};
