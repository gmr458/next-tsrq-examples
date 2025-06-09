"use client";

import { Input } from "@/components/ui/input";
import { fetchWrapper } from "@/lib/fetch-wrappers";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { Post } from "../api/posts/data";
import { CardPost, CardPostSkeleton } from "../basic/card-posts";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function Search() {
    const [searchTerm, setSearchTerm] = useQueryState("", { defaultValue: "" });
    const [searchTermDebounced] = useDebounce(searchTerm, 300);

    const { data, isLoading } = useQuery({
        queryKey: ["posts", "search", searchTermDebounced],
        queryFn: () =>
            fetchWrapper<Post[]>(
                `/api/posts/search?search=${searchTermDebounced}`,
            ),
        enabled: !!searchTermDebounced,
    });

    return (
        <div className="flex w-full max-w-lg flex-col gap-5">
            <div className="flex flex-col gap-1">
                <h1 className="text-center text-2xl">Search</h1>
                <div className="flex flex-row items-center justify-center gap-1">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                onClick={() => setSearchTerm("")}
                            >
                                <XIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clean</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full max-w-lg flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <CardPostSkeleton key={i} />
                    ))}
                </div>
            ) : null}
            {data && data?.length > 0 ? (
                <div className="flex w-full max-w-lg flex-col gap-4">
                    {data.map((post) => (
                        <CardPost key={post.id} post={post} />
                    ))}
                </div>
            ) : null}
            {!isLoading && data?.length === 0 ? <p>No data</p> : null}
        </div>
    );
}
