import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import TailwindIndicator from "@/components/tailwind-indicator";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html suppressHydrationWarning>
    <head />
    <body
      className={cn("bg-background font-sans antialiased", fontSans.variable)}
    >
      <Providers>
        <div className="flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Toaster />
        </div>
        <TailwindIndicator />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
