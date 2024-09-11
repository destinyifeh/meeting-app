"use client";

import { useEffect } from "react";

type CssVariables = Record<string, string>;

// Sets up CSS Variables based on brand colours
export const useVmsTheme = (theme: Record<string, CssVariables>) => {
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      if (key === "root") {
        const root = document.documentElement;
        Object.entries(value).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
        return;
      }
    });
  }, [theme]);
};
