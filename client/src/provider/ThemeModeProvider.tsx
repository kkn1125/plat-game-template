import { ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeModeContext } from "./context/ThemeModeContext";
import { darkTheme, lightTheme } from "./context/themeModeTypes";

interface ThemeModeProviderProps {
  children: React.ReactNode;
}

const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
