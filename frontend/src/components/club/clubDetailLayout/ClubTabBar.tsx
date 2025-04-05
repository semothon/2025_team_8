"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { isLoggedInAtom, userAtom } from "@front/state/userAtom";

const ClubTabBar = () => {
  const pathname = usePathname();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const user = useAtomValue(userAtom); //이거 백엔드 api랑 맞춰야 함,

  const match = pathname.match(/\/club\/(\d+)/); //club id 추출
  const currentClubId = match ? parseInt(match[1], 10) : null;

  const baseTabs = [
    { name: "활동 소개", path: `/club/${currentClubId}/introduction` },
    { name: "캘린더", path: `/club/${currentClubId}/calendar` },
    { name: "공지 게시판", path: `/club/${currentClubId}/notice` },
  ];

  const loginTabs = [
    { name: "자유 게시판", path: `/club/${currentClubId}/free` },
    { name: "부원 관리하기", path: `/club/${currentClubId}/member` },
  ];

  const adminTab = { name: "관리하기", path: `/club/${currentClubId}/admin` };

  const tabsToRender = [...baseTabs];

  if (isLoggedIn && user && currentClubId !== null) {
    if (user.clubIds.includes(currentClubId)) {
      tabsToRender.push(...loginTabs);
    }

    if (user.ManageIds.includes(currentClubId)) {
      tabsToRender.push(adminTab);
    }
  }

  return (
    <nav className="px-6 flex gap-6 border-b">
      {tabsToRender.map((tab) => (
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
