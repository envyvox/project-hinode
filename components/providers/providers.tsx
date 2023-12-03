"use client";

import AuthProvider from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import UserProvider from "./user-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Providers;
