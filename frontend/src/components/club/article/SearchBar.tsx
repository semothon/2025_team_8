"use client";

//back api 완성되면 고쳐야 함.
export default function SearchBar() {
  return (
    <div className="relative mt-5 px-10">
      <input
        type="text"
        className="w-full px-4 py-2 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500"
        placeholder="검색어를 입력해주세요."
      />
    </div>
  );
}
