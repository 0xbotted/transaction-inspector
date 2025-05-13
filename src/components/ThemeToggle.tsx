"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
