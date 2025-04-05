"use client";

import { useState, useEffect } from "react";
import ClubFilter, { categoryFilter, detailFilter, FilterType } from "./CategoryFilter";
import ClubList from "./ClubList";
import SearchBar from "./SearchBar";
import { ClubShortInfo } from "./ClubCard";

//클럽 목록 조회 
//백엔드 api 맞춰야 함, -> detail, category filter id는 추후에 number 형식으로 통일 하는게 좋을 듯


const clubsMock: ClubShortInfo[] = [
  { id: 1, title: "연극하는 사람들", category: "중앙동아리", detailID: "연행", shortInfo: "연극 제작 및 공연", imgUrl: "~" },
  { id: 2, title: "알고리즘 마스터", category: "스터디", detailID: "학술", shortInfo: "알고리즘 공부 모임", imgUrl: "~" },
  { id: 3, title: "축구는 못참지", category: "과동아리", detailID: "체육", shortInfo: "매주 과별 축구 경기", imgUrl: "~" },
  { id: 4, title: "사랑나눔 봉사단", category: "모임", detailID: "봉사", shortInfo: "지역사회 봉사활동", imgUrl: "~" },
  { id: 5, title: "캠퍼스 찬양팀", category: "중앙동아리", detailID: "종교", shortInfo: "기독교 찬양 활동", imgUrl: "~" },
  { id: 6, title: "프론트엔드 개발", category: "스터디", detailID: "IT프로젝트", shortInfo: "React + TypeScript", imgUrl: "~" },
  { id: 7, title: "영화 감상회", category: "모임", detailID: "취미교양", shortInfo: "영화 보고 토론해요", imgUrl: "~" },
  { id: 8, title: "일러스트 클래스", category: "과동아리", detailID: "전시창작", shortInfo: "그림 전시 준비", imgUrl: "~" },
  { id: 9, title: "모두의 기타", category: "중앙동아리", detailID: "기타", shortInfo: "기타 배우고 함께 연주", imgUrl: "~" },
  { id: 10, title: "드럼치는 컴공", category: "과동아리", detailID: "연행", shortInfo: "밴드 공연 준비", imgUrl: "~" },
  { id: 11, title: "딥러닝 스터디", category: "스터디", detailID: "학술", shortInfo: "AI 논문 함께 읽기", imgUrl: "~" },
  { id: 12, title: "헬창모임", category: "모임", detailID: "체육", shortInfo: "헬스장 같이 가요", imgUrl: "~" },
  { id: 13, title: "나눔천사회", category: "중앙동아리", detailID: "봉사", shortInfo: "복지관 봉사활동", imgUrl: "~" },
  { id: 14, title: "명상과 찬양", category: "모임", detailID: "종교", shortInfo: "기독명상과 찬양", imgUrl: "~" },
  { id: 15, title: "안드로이드 개발", category: "스터디", detailID: "IT프로젝트", shortInfo: "Kotlin으로 앱 만들기", imgUrl: "~" },
  { id: 16, title: "책읽는 사람들", category: "과동아리", detailID: "취미교양", shortInfo: "매주 책 1권 읽기", imgUrl: "~" },
  { id: 17, title: "디자인 프로젝트", category: "스터디", detailID: "전시창작", shortInfo: "UI/UX 전시 준비", imgUrl: "~" },
  { id: 18, title: "도전의 끝", category: "과동아리", detailID: "기타", shortInfo: "창의적인 실험 모임", imgUrl: "~" },
  { id: 19, title: "문화탐방단", category: "모임", detailID: "취미교양", shortInfo: "전통문화 체험", imgUrl: "~" },
  { id: 20, title: "멀티캠퍼스 AI팀", category: "스터디", detailID: "IT프로젝트", shortInfo: "캠퍼스 AI 공동 프로젝트", imgUrl: "~" },
];


export default function ClubListContainer() {
  const [selectedCategory, setSelectedCategory] = useState<FilterType>(categoryFilter[0]);
  const [selectedDetail, setSelectedDetail] = useState<FilterType>(detailFilter[0]);
  const [clubs, setClubs] = useState<ClubShortInfo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //실제 fetch API로 대체 예정 이거는 그냥 작동 테스트
    const filtered = clubsMock.filter((club) => {
      const matchCategory = selectedCategory.name === "전체" || club.category === selectedCategory.name;
      const matchSearch = !search || club.title.includes(search) || club.shortInfo.includes(search);
      return matchCategory && matchSearch;
    });

    setClubs(filtered);
  }, [selectedCategory, selectedDetail, search]);

  return (
    <div>
      <ClubFilter filters={categoryFilter} onSelect={setSelectedCategory} selected={selectedCategory} />
      <div className="mt-4">
        <ClubFilter filters={detailFilter} onSelect={setSelectedDetail} selected={selectedDetail} />
      </div>
      <div className="mt-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="mt-8">
        <ClubList clubs={clubs} />
      </div>
    </div>
  );
}
