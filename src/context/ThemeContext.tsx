"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import nookies from "nookies";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider = ({
  children,
  initialTheme = "dark",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    // Get the theme from the cookie or use initialTheme
    const cookieTheme = nookies.get(null).theme as Theme;
    if (cookieTheme) {
      setTheme(cookieTheme);
    } else {
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    nookies.set(null, "theme", theme, { path: "/" });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
