"use client";

import { useAtom } from "jotai";
import PostItem from "./PostItem";
import { currentPageAtom } from "@front/state/NoticeAtom";

const mockNotices = Array(15).fill({
  title: "뭐시라뭐시라 이것은 중요한 공지입니다.",
  author: "최재민",
  date: "2025. 03. 31. 20:03:47",
  views: 1222,
});

export default function PostList() {
  const [currentPage] = useAtom(currentPageAtom);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] p-2 border-b border-gray-300 text-sm items-center">
        <div className="truncate w-full">제목</div>
        <div className="text-center">글쓴이</div>
        <div className="text-center">작성일</div>
        <div className="text-right">조회</div>
      </div>
      {mockNotices.map((notice, index) => (
        <PostItem key={index} {...notice} />
      ))}
      <div className="border-b border-gray-300" />
    </div>
  );
}
