import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-[calc(100dvh-55px)] flex-col items-center justify-center gap-8 px-4 lg:gap-5 lg:px-0">
            <h1 className="text-center text-2xl font-bold">
                TanStack React Query Examples
            </h1>
            <div className="grid max-w-lg grid-cols-1 gap-4 lg:w-full lg:grid-cols-3 lg:gap-2">
                {routes.map((route) => (
                    <Button
                        asChild
                        key={route.href}
                        variant="secondary"
                        size="lg"
                    >
                        <Link href={route.href}>{route.label}</Link>
                    </Button>
                ))}
            </div>
        </main>
    );
}
