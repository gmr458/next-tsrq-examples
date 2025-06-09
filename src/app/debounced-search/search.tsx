"use client";

import { Post } from "@/app/api/posts/data";
import { CardPost, CardPostSkeleton } from "@/app/basic/card-posts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchWrapper } from "@/lib/fetch-wrappers";
import {
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from "@tanstack/react-query";
import { CircleXIcon, RotateCwIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";
import { useDebounce } from "use-debounce";

function SearchResults({
    isLoading,
    isError,
    data,
    searchTerm,
    refetch,
}: {
    isLoading: boolean;
    isError: boolean;
    data: Post[] | undefined;
    searchTerm: string;
    refetch: (
        options?: RefetchOptions,
    ) => Promise<QueryObserverResult<Post[], Error>>;
}) {
    if (isLoading) {
        return (
            <>
                {Array.from({ length: 3 }).map((_, i) => (
                    <CardPostSkeleton key={i} />
                ))}
            </>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <Alert variant="destructive">
                    <CircleXIcon className="h-4 w-4" />
                    <AlertTitle>Could not fetch posts</AlertTitle>
                    <AlertDescription>
                        <p>
                            An error occurred while fetching posts. Please try
                            again.
                        </p>
                    </AlertDescription>
                </Alert>
                <Button onClick={() => refetch()} variant="secondary">
                    <RotateCwIcon className="mr-1 h-4 w-4" />
                    Try again
                </Button>
            </div>
        );
    }

    if (data?.length === 0) {
        return (
            <p className="text-muted-foreground text-center">
                No results found for &quot;{searchTerm}&quot;.
            </p>
        );
    }

    if (data) {
        return (
            <>
                {data.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
            </>
        );
    }

    return null;
}

export function Search() {
    const [searchTerm, setSearchTerm] = useQueryState("q", {
        defaultValue: "",
    });
    const [searchTermDebounced] = useDebounce(searchTerm, 300);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["posts", "search", searchTermDebounced],
        queryFn: () =>
            fetchWrapper<Post[]>(`/api/posts/search?q=${searchTermDebounced}`),
        enabled: !!searchTermDebounced,
    });

    return (
        <div className="flex w-full flex-col gap-6 px-4 lg:max-w-lg lg:px-0">
            <div className="flex flex-col gap-2">
                <h1 className="text-center text-3xl font-bold">Search Posts</h1>
                <div className="relative flex items-center">
                    <Input
                        placeholder="Search by title or content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                    {searchTerm && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 h-7 w-7"
                                    onClick={() => setSearchTerm(null)}
                                >
                                    <XIcon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Clear search</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {!searchTermDebounced ? (
                    <p className="text-muted-foreground text-center">
                        Start typing to see results.
                    </p>
                ) : (
                    <SearchResults
                        isLoading={isLoading}
                        isError={isError}
                        data={data}
                        searchTerm={searchTermDebounced}
                        refetch={refetch}
                    />
                )}
            </div>
        </div>
    );
}
