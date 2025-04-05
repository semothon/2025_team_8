import Link from "next/link";

//login 상태에 따라 다르게 구현해야 함.
const Header = () => {
  return (
    <header className=" py-4 px-6 flex items-center justify-between">

      <h1 className="text-xl font-bold whitespace-nowrap">khulub</h1>

      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="전체 검색하기"
          className="hidden sm:block bg-[#951E1E1A] text-gray-500 px-4 py-2 rounded-full outline-none w-1/3"
        />
      </div>

      <nav className="flex gap-4 text-sm sm:text-base">
        <Link href="/club" className="text-black">활동 목록</Link>
        <Link href="/login" className="text-gray-500">로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
