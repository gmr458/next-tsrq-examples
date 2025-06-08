"use client";

import { CardPosts } from "@/app/basic/card-posts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as React from "react";

const options = [
    {
        label: "Technology",
        value: "technology",
    },
    {
        label: "Design",
        value: "design",
    },
    {
        label: "Productivity",
        value: "productivity",
    },
    {
        label: "Empty category",
        value: "empty",
    },
];

export default function Page() {
    const [category, setCategory] = React.useState<string>("technology");

    return (
        <main className="flex flex-col items-center justify-center gap-5 px-4 py-4 lg:h-[calc(100dvh-55px)]">
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 lg:w-full">
                {options.map((opt) => (
                    <Button
                        key={opt.value}
                        onClick={() => setCategory(opt.value)}
                        variant={
                            category === opt.value ? "default" : "secondary"
                        }
                    >
                        {opt.label}
                    </Button>
                ))}
            </div>
            <Card className="w-full flex-1 lg:w-124">
                <CardPosts category={category} />
            </Card>
        </main>
    );
}
