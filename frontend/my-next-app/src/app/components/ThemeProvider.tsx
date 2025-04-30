"use client"; // Mark this file as a Client Component

import React from "react";
import { ThemeProvider } from "@/app/context/ThemeContext";

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;