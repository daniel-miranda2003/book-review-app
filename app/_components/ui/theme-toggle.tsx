"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" />; // skeleton placeholder
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-800 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white"
      title="Alternar Tema"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar Tema</span>
    </button>
  );
}
