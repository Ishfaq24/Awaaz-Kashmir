import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { MessageSquare, Send } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import {
  getComments,
  addComment,
} from "../../../api/report";

export default function CommentsCard({
  reportId,
}) {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [message, setMessage] = useState("");

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", reportId],
    queryFn: () => getComments(reportId),
  });

  const commentMutation = useMutation({
    mutationFn: () =>
      addComment(reportId, {
        clerkId: user.id,
        name: user.fullName,
        image: user.imageUrl,
        message,
      }),
    onSuccess: () => {
      setMessage("");

      queryClient.invalidateQueries({
        queryKey: ["comments", reportId],
      });

      queryClient.invalidateQueries({
        queryKey: ["priority-queue"],
      });
    },
  });

  return (
    <div className="rounded-3xl border bg-white p-6">

      <div className="flex items-center gap-3 mb-6">

        <MessageSquare className="text-blue-600" />

        <h2 className="text-xl font-bold">
          Comments
        </h2>

      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">

        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-3 border rounded-2xl p-4"
            >

              <img
                src={comment.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">

                <div className="flex justify-between">

                  <h3 className="font-semibold">
                    {comment.name}
                  </h3>

                  <span className="text-xs text-gray-500">
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

                <p className="mt-2 text-gray-700">
                  {comment.message}
                </p>

              </div>

            </div>
          ))
        )}

      </div>

      <div className="flex gap-3 mt-6">

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Write a reply..."
          className="flex-1 border rounded-xl px-4 py-3"
        />

        <button
          disabled={!message.trim()}
          onClick={() =>
            commentMutation.mutate()
          }
          className="bg-awaaz-secondary text-white px-5 rounded-xl flex items-center gap-2"
        >

          <Send size={18} />

          Send

        </button>

      </div>

    </div>
  );
}
