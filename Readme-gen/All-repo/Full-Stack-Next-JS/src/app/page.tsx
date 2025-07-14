import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="rounded-2xl text-6xl sm:text-8xl font-bold shadow-2xl  p-4 text-slate-400">
          Why Are You Here?
        </h1>
        <p className="text-xl max-w-lg duration-500 hover:text-yellow-500">
          Join our platform today to unlock exclusive content and features. Take
          the next step on your journey by creating an account.
        </p>
        <Link href="/signup">
          <Button variant="default" size="lg" className="bg-green-600 duration-500 hover:text-yellow-500 hover:bg-green-700 transition-colors shadow-lg">
            Sign Up Now
          </Button>
        </Link>
      </main>
    </div>
  );
}
