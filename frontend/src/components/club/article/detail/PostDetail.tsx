"use client";

import React from "react";

interface PostDetailProps {
  user: string;
  title: string;
  views: number;
  date: string;
  content: string;
}

export default function PostDetail({ user, title, views, date, content }: PostDetailProps) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-500 text-sm mt-1">
        조회 {views.toLocaleString()}회 · { user } · {date}
      </p>
      <hr className="my-4" />
      <p className="text-gray-700 leading-6">{content}</p>
    </div>
  );
}
