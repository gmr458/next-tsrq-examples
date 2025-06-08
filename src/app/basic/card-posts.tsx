import { Post } from "@/app/api/posts/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchWrapper } from "@/lib/fetch-wrappers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CircleXIcon, Loader2Icon, RotateCwIcon } from "lucide-react";
import * as React from "react";

interface CardPostsProps {
    category: string;
}

export function CardPosts({ category }: CardPostsProps) {
    const query = useQuery({
        queryKey: ["posts", category],
        queryFn: () => fetchWrapper<Post[]>(`/api/posts?category=${category}`),
    });

    const getTitle = () => {
        if (query.isFetching && query.failureCount > 0) {
            return `Retrying... Attempt #${query.failureCount + 1}`;
        }
        if (query.isLoading) {
            return "Loading posts...";
        }
        if (query.isError) {
            return "An Error Occurred";
        }
        return `Posts by ${category}`;
    };

    return (
        <Card className="w-full lg:w-124">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">{getTitle()}</CardTitle>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => query.refetch()}
                            size="icon"
                            className="size-7"
                            disabled={query.isFetching}
                        >
                            {query.isFetching ? (
                                <Loader2Icon className="size-3 animate-spin" />
                            ) : (
                                <RotateCwIcon className="size-3" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-xs">
                            {query.isFetching
                                ? "Fetching latest data..."
                                : "Refetch"}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    <div className="flex flex-col gap-4 pr-4">
                        <CardPostsContent query={query} />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

function CardPostsContent({ query }: { query: UseQueryResult<Post[], Error> }) {
    const { isLoading, isError, error, data, refetch } = query;

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
            <Alert variant="destructive">
                <CircleXIcon className="h-4 w-4" />
                <AlertTitle>Could not fetch posts</AlertTitle>
                <AlertDescription>
                    <p className="mb-4">{error.message}</p>
                    <Button onClick={() => refetch()} variant="secondary">
                        <RotateCwIcon className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (data && data.length > 0) {
        return (
            <>
                {data.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
            </>
        );
    }

    return (
        <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-center">
                No posts found in this category.
            </p>
        </div>
    );
}

export const CardPost = React.memo(function CardPost({ post }: { post: Post }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>{post.body}</CardContent>
        </Card>
    );
});
export const CardPostSkeleton = React.memo(function CardPostSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-2/3" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
        </Card>
    );
});
