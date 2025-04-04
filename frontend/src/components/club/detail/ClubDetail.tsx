"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";

const ClubTabBar = () => {
  const pathname = usePathname();

  // 기본 탭
  const baseTabs = [
    { name: "활동 소개", path: "/club/1/introduction" },
    { name: "캘린더", path: "/club/1/calendar" },
    { name: "공지 게시판", path: "/club/1/notice" },
  ];

  const loginTab = [
    { name: "자유 게시판", path: "/club/1/free" },
    { name: "부원 관리하기", path: "/club/1/member" },
  ];

  const adminTab = { name: "관리하기", path: "/club/1/admin" }
  
  return (
    <nav className=" px-6 flex gap-6 border-b">
      {baseTabs.map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={`py-4 ${
            pathname === tab.path ? "font-bold text-black" : "text-gray-500"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
};

export default ClubTabBar;
