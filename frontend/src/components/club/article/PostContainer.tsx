"use client";

import { useEffect, useState } from "react";
import WriteButton from "./WriteButton";
import PostList from "./PostList";
import Pagination from "./Pagination"; // 오타 수정
import SearchBar from "./SearchBar";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
}

export default function PostContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;

  //여기 use effect 부분 실제로 api 나오면 수정 해야 함. 
  const generateMockPosts = (): Post[] => {
    return Array.from({ length: ITEMS_PER_PAGE }, (_, i) => {
      const index = (currentPage - 1) * ITEMS_PER_PAGE + i + 1;
      return {
        id: index.toString(),
        title: `공지사항 제목 ${index}`,
        author: `작성자 ${index}`,
        date: new Date().toISOString().split("T")[0], 
        views: Math.floor(Math.random() * 1000), 
      };
    });
  };

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const mockPosts = generateMockPosts();
      setPostList(mockPosts);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentPage]);

  return (
    <div>
      <WriteButton />
      {loading ? <div>로딩 중...</div> : <PostList postList={postList} />}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={10}
      />
      <SearchBar />
    </div>
  );
}
