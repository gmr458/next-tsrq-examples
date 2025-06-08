import { Post } from "@/app/api/posts/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchWrapper } from "@/lib/fetch-wrappers";
import { useQuery } from "@tanstack/react-query";
import { CircleXIcon, Loader2Icon, RotateCwIcon } from "lucide-react";
import * as React from "react";

interface CardPostsProps {
    category: string;
}

export function CardPosts({ category }: CardPostsProps) {
    const {
        data,
        isLoading,
        isFetching,
        failureCount,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["posts", category],
        queryFn: () => fetchWrapper<Post[]>(`/api/posts?category=${category}`),
    });

    if (isFetching && failureCount > 0) {
        return (
            <>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">
                        Retrying... Attempt #{failureCount + 1}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <CardPostSkeleton key={i} />
                    ))}
                </CardContent>
            </>
        );
    }

    if (isLoading) {
        return (
            <>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">Loading posts</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <CardPostSkeleton key={i} />
                    ))}
                </CardContent>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <CircleXIcon />
                        <AlertTitle>Internal server error</AlertTitle>
                        <AlertDescription>
                            <p>Try later</p>
                            <p>{error.message}</p>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </>
        );
    }

    return (
        <>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Posts by {category}</CardTitle>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => refetch()}
                            size="icon"
                            className="size-7"
                        >
                            {isFetching ? (
                                <Loader2Icon className="size-3 animate-spin" />
                            ) : (
                                <RotateCwIcon className="size-3" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isFetching ? (
                            <p className="text-xs">Fetching latest data...</p>
                        ) : (
                            <p>Refetch</p>
                        )}
                    </TooltipContent>
                </Tooltip>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {data && data?.length > 0 ? (
                    data.map((post) => <CardPost key={post.id} post={post} />)
                ) : (
                    <p className="text-center text-2xl">Empty</p>
                )}
            </CardContent>
        </>
    );
}

export function CardPost({ post }: { post: Post }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>{post.body}</CardContent>
        </Card>
    );
}

export function CardPostSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-20 lg:w-40" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-5 w-full lg:w-80" />
                <Skeleton className="mt-1 block h-5 w-[50%] lg:hidden lg:w-80" />
            </CardContent>
        </Card>
    );
}
