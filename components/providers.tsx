"use client";

import AuthProvider from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" enableSystem={false}>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
