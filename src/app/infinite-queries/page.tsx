"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateTime } from "@/lib/date-time-format";
import { formatRelativeTime } from "@/lib/relative-time-format";
import { CircleXIcon, Loader2Icon, SendIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Comment } from "../api/comments/data";
import { useInfiniteQueryComments, useMutationComments } from "./hooks";

export default function Page() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQueryComments();

    const comments = data?.pages.flatMap((page) => page.comments);

    return (
        <main className="flex flex-col items-center justify-center gap-5 py-8">
            <h1 className="text-2xl">Infinite Queries &amp; Mutations</h1>
            <div className="flex w-full max-w-lg flex-col gap-4">
                <AddComment />
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

export function AddComment() {
    const [commentText, setCommentText] = React.useState<string>("");
    const mutation = useMutationComments();
    const commentTextIsEmpty = !commentText.trim();

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        mutation.mutate(
            { text: commentText },
            {
                onSuccess: (data, variables, context) => {
                    console.log({ data, variables, context });
                    setCommentText("");
                    toast.success("Comment added", { duration: 10000 });
                },
                onError: (_error, _variables, _context) => {
                    toast.error("Error trying to add comment", {
                        duration: 10000,
                    });
                },
            },
        );
    };

    return (
        <div className="flex flex-row gap-2">
            <Input
                placeholder="Write your comment"
                value={commentText}
                disabled={mutation.isPending}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddComment();
                    }
                }}
            />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        disabled={commentTextIsEmpty || mutation.isPending}
                        onClick={() => handleAddComment()}
                    >
                        {mutation.isPending ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            <SendIcon />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {mutation.isPending
                            ? "Loading..."
                            : commentTextIsEmpty
                              ? "Comment requires text"
                              : "Send"}
                    </p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
