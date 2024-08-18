"use client";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  ReactNode,
} from "react";
import nookies from "nookies";

enum Theme {
  Light = "light",
  Dark = "dark",
}

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
  initialTheme = Theme.Dark,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const cookieTheme = nookies.get(null).theme;
    return cookieTheme === Theme.Light || cookieTheme === Theme.Dark
      ? (cookieTheme as Theme)
      : initialTheme;
  });

  const [isThemeApplied, setIsThemeApplied] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.classList.remove(Theme.Light, Theme.Dark);
    document.documentElement.classList.add(theme);

    // Save the preference in cookies
    nookies.set(null, "theme", theme, { path: "/" });

    setIsThemeApplied(true);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.Dark ? Theme.Light : Theme.Dark
    );
  };

  if (!isThemeApplied) {
    // Return a loading screen while waiting for the theme to be applied
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-t-transparent border-gray-600 dark:border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
