"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="flex h-[55px] flex-row items-center justify-between gap-2 border-b-1 border-r-slate-400 px-2 py-4">
            <div className="flex flex-row items-center justify-start gap-2">
                <Button asChild variant="secondary" size="sm">
                    <Link href="/">Home</Link>
                </Button>
                <div className="hidden flex-row items-center justify-start gap-2 lg:flex">
                    {routes.map((route) => (
                        <Button
                            asChild
                            key={route.href}
                            variant={
                                pathname === route.href
                                    ? "default"
                                    : "secondary"
                            }
                            size="sm"
                        >
                            <Link href={route.href}>{route.label}</Link>
                        </Button>
                    ))}
                </div>
            </div>
            <ModeToggle />
        </header>
    );
}
