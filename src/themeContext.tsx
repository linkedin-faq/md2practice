// themeContext.js

import React from "react";

const defaultTheme = "light";

interface Props {
  //   initialTheme: string;
  children: React.ReactNode;
}

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  // If you want to use light theme as the default, return "light" instead
  return defaultTheme;
};

export const ThemeContext = React.createContext({
  theme: defaultTheme,
  setTheme: (str: string) => console.log(`setTheme function is null. ${str}`),
});

export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const [theme, setTheme] = React.useState(getInitialTheme());

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (theme) {
    rawSetTheme(theme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
