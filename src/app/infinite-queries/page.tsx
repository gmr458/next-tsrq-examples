"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateTime } from "@/lib/date-time-format";
import { fetchWrapper } from "@/lib/fetch-wrappers";
import { formatRelativeTime } from "@/lib/relative-time-format";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CircleXIcon, Loader2Icon } from "lucide-react";
import { Comment } from "../api/comments/data";
import { CommentsResponse } from "../api/comments/route";

export default function Page() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["comments"],
        queryFn: ({ pageParam }) =>
            fetchWrapper<CommentsResponse>(
                `/api/comments?${pageParam ? `cursor=${pageParam}` : ""}`,
            ),
        initialPageParam: undefined as number | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const comments = data?.pages.flatMap((page) => page.comments);

    return (
        <main className="flex flex-col items-center justify-center gap-5 py-8">
            <h1 className="text-2xl">Infinite Queries</h1>
            <div className="flex w-full max-w-lg flex-col gap-4">
                {isLoading && <LoadingComments count={5} />}
                {comments &&
                    comments.length > 0 &&
                    comments.map((comment) => (
                        <CardComment comment={comment} key={comment.id} />
                    ))}
                {isError && !isFetchingNextPage && (
                    <div className="flex flex-row items-center justify-center gap-1">
                        <CircleXIcon className="text-destructive h-4 w-4" />
                        <p className="text-destructive">
                            Could not fetch comments
                        </p>
                    </div>
                )}
                {isFetchingNextPage && <LoadingComments count={5} />}
            </div>
            {hasNextPage && (
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage && (
                        <Loader2Icon className="animate-spin" />
                    )}

                    {isFetchingNextPage
                        ? "Loading more comments..."
                        : "Load more comments"}
                </Button>
            )}
        </main>
    );
}

export function CardComment({ comment }: { comment: Comment }) {
    return (
        <Card>
            <CardContent className="flex flex-row gap-4">
                <Avatar>
                    <AvatarFallback>{comment.user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                        <h6 className="font-bold">{comment.user.name}</h6>
                        <Tooltip>
                            <TooltipTrigger>
                                <p className="text-xs">
                                    {formatRelativeTime(comment.createdAt)}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent>
                                {formatDateTime(comment.createdAt)}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <p>{comment.text}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function CardCommentSkeleton() {
    return (
        <Card>
            <CardContent className="flex flex-row gap-4">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-90" />
                </div>
            </CardContent>
        </Card>
    );
}

export function LoadingComments({ count }: { count: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <CardCommentSkeleton key={i} />
            ))}
        </>
    );
}
