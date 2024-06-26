import Logo from "@/app/_components/Logo";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-screen flex flex-col px-2 md:px-4 lg:px-8 xl:px-16">
      <header className="w-full h-16 border-b flex items-end pb-2 justify-between md:px-4">
        <Logo />
        <Button asChild size="sm" variant="ghost">
          <Link href="/signin" scroll={false}>
            Login
          </Link>
        </Button>
      </header>
    </main>
  );
}
