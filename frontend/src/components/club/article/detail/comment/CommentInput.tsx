"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { commentsAtom } from "@front/state/commentAtom";

export default function CommentInput() {
  const [text, setText] = useState("");
  const [comments, setComments] = useAtom(commentsAtom);

  const handleSubmit = () => {
    if (!text.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: "최재민",
      content: text,
      date: new Date().toISOString().replace("T", " ").split(".")[0],
    };

    setComments([...comments, newComment]);
    setText("");
  };

  return (
    <div className="mt-4 flex items-center rounded-lg p-3 bg-gray-100">
      <input
        type="text"
        className="flex-1 p-2 text-sm bg-transparent outline-none"
        placeholder="여기에 댓글을 작성하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        등록하기
      </button>
    </div>
  );
}
