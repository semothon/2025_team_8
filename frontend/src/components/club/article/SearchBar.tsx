"use client";

import { searchAtom } from "@front/state/PaginationAtom";
import { useAtom } from "jotai";

export default function SearchBar() {
  const [search, setSearch] = useAtom(searchAtom);

  return (
    <div className="relative mt-5 px-10">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        placeholder="검색어를 입력해주세요."
      />
    </div>
  );
}
