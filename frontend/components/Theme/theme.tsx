import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightBlue, pink } from "@mui/material/colors";

interface Props {
    children : any
}
const theme = createTheme({
    palette: { 
        primary: {
          main: '#82DDED'
        }, 
        secondary: {
            main: '#005C7A'
        },
    }
  });

export default function Palette({ children } : Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
} 