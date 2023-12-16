import { siteConfig } from "@/config/site";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import ThemeToggle from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import UserAvatar from "./user-avatar";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={siteConfig.links.twitter}
            >
              <Twitter />
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={siteConfig.links.github}
            >
              <Github />
            </Link>
            <ThemeToggle />
            <LocaleSwitcher />
            <UserAvatar />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
