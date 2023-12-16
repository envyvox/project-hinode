import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center p-24">
      <Link className={buttonVariants()} href="/dashboard">
        Start playing
      </Link>
    </main>
  );
};

export default Home;
