import PostList from "@front/components/club/article/PostList";
import WriteButton from "@front/components/club/article/WriteButton";
import Pagination from "@front/components/club/article/Paginatioin";
import SearchBar from "@front/components/club/article/SearchBar";

const mockNotices = Array(15).fill({
  title: "뭐시라뭐시라 이것은 중요한 공지입니다.",
  author: "최재민",
  date: "2025. 03. 31. 20:03:47",
  views: 1222,
});

export default function NoticeListPage() {
  return (
    <div>
      <WriteButton />
      <PostList postList={mockNotices}/>
      <Pagination />
      <SearchBar />
    </div>
  );
}
