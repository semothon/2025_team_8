"use client"; 

import Image from "next/image";

const ClubHeader = () => {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 text-xl"> ←</button>
        {/* <Image
          src="/club-logo.png" 
          alt="Club Logo"
          width={50}
          height={50}
          className="rounded-full"
        /> */}
        <div>
          <h2 className="text-xl font-bold">키우기 닷컴</h2>
          <p className="text-gray-500 text-sm">🏠 취미교양</p>
        </div>
      </div>

      <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm">
        지원하기
      </button>
    </div>
  );
};

export default ClubHeader;
