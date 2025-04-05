// app/activities/page.tsx

import ClubFilter, { categoryFilter, detailFilter} from "@front/components/club/CategoryFilter";
import ClubList from "@front/components/club/ClubList";
import ClubListContainer from "@front/components/club/ClubListContainer";
import SearchBar from "@front/components/club/SearchBar";

export default function ClubListPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">활동 목록</h1>
      <p className="text-gray-500 mt-2">khulub에서 지원하는 활동 목록입니다.</p>

      <div className="mt-7">
        <ClubListContainer></ClubListContainer>
      </div>      
      {/* 활동 만들기 버튼 */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 text-gray-500 bg-gray-100 rounded-lg">
          활동 만들기
        </button>
      </div>
    </div>
  );
}
