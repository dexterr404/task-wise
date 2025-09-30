import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const[theme, setTheme] = useState(() => {
        //initialize from localStorage
        return localStorage.getItem("theme") || "system";
    });

    useEffect(() => {
        const root = document.documentElement;

        const applyTheme = (mode) => {
            root.classList.remove("light", "dark");
            root.classList.add(mode);
        }

        let appliedTheme = theme;

        if(theme === "system") {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
            appliedTheme = systemDark.matches ? "dark" : "light";
            applyTheme(appliedTheme);

            const handler = (e) => applyTheme(e.matches ? "dark" : "light");
            systemDark.addEventListener("change", handler);

            return () => systemDark.removeEventListener("change", handler);
        } else {
            applyTheme(theme);
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}