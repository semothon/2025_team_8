"use client";

import CommentInput from "@front/components/club/article/detail/comment/CommentInput";
import CommentList from "@front/components/club/article/detail/comment/CommentList";
import PostDetail from "@front/components/club/article/detail/PostDetail";
import { useParams } from "next/navigation";


export default function PostPage() {
  const params = useParams();
  const id = params?.id as string;

  const post = { 
    id,
    user : "최재민",
    title: "뭐시라뭐시라 이것은 중요한 공지입니다.",
    views: 11223,
    date: "2025. 03. 31. 20:03:47",
    content: "이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...이것은 게시글의 본문입니다. 이것은 게시글의 본문입니다...",
  };
  
  return (
    <div >
      <PostDetail {...post} />
      <CommentList />
      <CommentInput />
    </div>
  );
}
