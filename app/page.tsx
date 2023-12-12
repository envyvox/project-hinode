import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <Link className={buttonVariants()} href="/dashboard">
        Start playing
      </Link>
    </main>
  );
}
