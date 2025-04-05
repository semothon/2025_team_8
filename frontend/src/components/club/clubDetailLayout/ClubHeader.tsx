"use client";

import Image from "next/image";
import Link from "next/link";

interface ClubHeaderProps {
  clubName: string;
  category: string;
  imageUrl: string;
  onApplyClick?: () => void; //지원하기 버튼 추후 기능 확장
}

const ClubHeader = ({ clubName, category, imageUrl, onApplyClick }: ClubHeaderProps) => {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/club"
          className="text-gray-500 text-xl hover:text-black hover:bg-gray-200 p-2 rounded-full transition-colors"
        >
          ←
        </Link>
        <Image
          src={imageUrl}
          alt="Club Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{clubName}</h2>
          <p className="text-gray-500 text-sm">{category}</p>
        </div>
      </div>

      <button
        onClick={onApplyClick}
        className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm"
      >
        지원하기
      </button>
    </div>
  );
};

export default ClubHeader;
