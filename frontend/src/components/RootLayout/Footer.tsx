import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 사이트 소개 */}
        <div>
          <h2 className="text-xl font-bold mb-2">Khulub</h2>
          <p className="text-sm">
            경희 대학교 동아리 탐색과 참여를 위한 플랫폼입니다! 다양한 동아리에 대한 정보를 관리해요!
          </p>
        </div>

        {/* 연락처 */}
        <div>
          <h3 className="font-semibold mb-2">connect</h3>
          <ul className="text-sm space-y-1">
          <li>디자인: 최호연 , 최서연</li>
          <li>개발: 최재민, 최은석, 황효은, 이윤건, 안시현</li>
            <li>이메일: whowhowhowhowho</li>
            <li>주소: 경희대학교</li>
          </ul>
        </div>
      </div>

      {/* 저작권 하단 */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MyClub. All rights reserved.
      </div>
    </footer>
  );
}
