import { computed } from "vue";
import { useTheme } from "vuetify";

export function useAppTheme() {
  const theme = useTheme();

  const isDark = computed(() => theme.global.name.value === "dark");

  function toggleTheme() {
    const next = isDark.value ? "light" : "dark";
    theme.global.name.value = next;
    localStorage.setItem("theme", next);
  }

  return { isDark, toggleTheme };
}