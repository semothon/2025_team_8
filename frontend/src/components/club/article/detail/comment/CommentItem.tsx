"use client";

import { Comment } from "@front/state/commentAtom";
import React from "react";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <p className="text-sm font-semibold">{comment.author} · {comment.date}</p>
      <p className="text-gray-700 mt-1">{comment.content}</p>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-2 border-l-2 border-gray-300 pl-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
