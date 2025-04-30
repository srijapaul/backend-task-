"use client"
import React,{ createContext, useContext, useState, useEffect } from "react";
interface ThemeContextType {
    theme:"light" | "dark";
    toggleTheme:()=>void;
}
const ThemeContext=createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider:React.FC<{children: React.ReactNode}> = ({children})=>{
    const [theme,setTheme]=useState<"light" | "dark">("light");

    const toggleTheme=()=>{
        setTheme((prevTheme)=>(prevTheme==="light"?"dark":"light"));
        console.log(theme);

    };
    useEffect(() => {
        document.body.className = theme === "light" ? "light-theme" : "dark-theme"; // Set the body class based on the theme
        console.log("Theme updated to:", theme);
      }, [theme]);
    

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )};

    export const useThemeContext=()=>{
        const context=useContext(ThemeContext);
        if(!context){
            throw new Error("useThemeContext must be used within a ThemeProvider");
        }
        return context;
    }