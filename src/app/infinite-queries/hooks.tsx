"use client";

import { fetchWrapper } from "@/lib/fetch-wrappers";
import {
    InfiniteData,
    QueryKey,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { CommentsResponse } from "../api/comments/route";
import { Comment } from "../api/comments/data";

const queryKey: QueryKey = ["comments"];

export function useInfiniteQueryComments() {
    return useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) =>
            fetchWrapper<CommentsResponse>(
                `/api/comments?${pageParam ? `cursor=${pageParam}` : ""}`,
            ),
        initialPageParam: undefined as number | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
}

export function useMutationComments() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (comment: { text: string }) =>
            fetchWrapper<{ comment: Comment }>("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }),
        onSuccess: async (data, variables, context) => {
            await queryClient.cancelQueries({ queryKey });
            queryClient.setQueryData<
                InfiniteData<CommentsResponse, unknown> | undefined
            >(queryKey, (oldData) => {
                const firstPage = oldData?.pages[0];
                if (firstPage) {
                    return {
                        ...oldData,
                        pages: [
                            {
                                ...firstPage,
                                totalComments: firstPage.totalComments + 1,
                                comments: [data.comment, ...firstPage.comments],
                            },
                            ...oldData.pages.slice(1),
                        ],
                    };
                }
            });
        },
    });
}
