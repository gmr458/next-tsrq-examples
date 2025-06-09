"use client";

import { Suspense } from "react";
import { Search } from "./search";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center gap-5 py-3">
            <Suspense>
                <Search />
            </Suspense>
        </main>
    );
}
