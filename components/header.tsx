import Link from "next/link";

import { siteConfig } from "@/config/site";

import LocaleSwitcher from "./locale-switcher";
import MobileSidebar from "./mobile-sidebar";
import SessionAvatar from "./session-avatar";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <div className="flex md:hidden">
            <MobileSidebar />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <LocaleSwitcher />
            <SessionAvatar />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
