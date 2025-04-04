import PostList from "@front/components/club/article/PostList";
import WriteButton from "@front/components/club/article/WriteButton";
import Pagination from "@front/components/club/article/Paginatioin";
import SearchBar from "@front/components/club/article/SearchBar";

export default function ClubPage() {
  return (
    <div>
      <WriteButton />
      <PostList />
      <Pagination />
      <SearchBar />
    </div>
  );
}
