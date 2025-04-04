"use client";

import { useAtom } from "jotai";
import PostItem from "./PostItem";
import { currentPageAtom } from "@front/state/NoticeAtom";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
}

interface PostListProps {
  postList: Post[];
}

export default function PostList({ postList }: PostListProps) {
  const [currentPage] = useAtom(currentPageAtom);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] p-2 border-b border-gray-300 text-sm items-center">
        <div className="truncate w-full">제목</div>
        <div className="text-center">글쓴이</div>
        <div className="text-center">작성일</div>
        <div className="text-right">조회</div>
      </div>
      {postList.map((notice, index) => (
        <PostItem key={index} {...notice} />
      ))}
      <div className="border-b border-gray-300" />
    </div>
  );
}
