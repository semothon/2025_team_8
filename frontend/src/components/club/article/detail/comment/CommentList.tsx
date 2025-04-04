"use client";

import { useAtom } from "jotai";
import {commentsAtom } from "@front/state/commentAtom";
import CommentItem from "./CommentItem";

export default function CommentList() {
  const [comments] = useAtom(commentsAtom);

  return (
    <div className="mt-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
