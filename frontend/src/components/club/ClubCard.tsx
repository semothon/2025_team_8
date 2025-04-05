"use client"
import { useRouter } from 'next/navigation';

export interface ClubShortInfo {
  id: number;
  title: string;
  category: string;
  detailID: string;
  shortInfo: string;
  imgUrl: string;
}

export default function ClubCard({ club }: { club: ClubShortInfo }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/club/${club.id}/introduction`);
  };

  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg shadow cursor-pointer hover:bg-red-50 transition"
      style={{ backgroundColor: '#951E1E0D' }}
      onClick={handleClick}
    >
      {/* 텍스트*/}
      <div>
        <p className="text-sm text-gray-500">{club.shortInfo}</p>
        <h2 className="font-bold text-lg">{club.title}</h2>
        <p className="text-gray-500">{club.category}</p>
      </div>

      {/* 오른쪽에 들어갈 이미지 */}
      <div className="w-12 h-12 bg-black rounded-full" />
    </div>
  );
}