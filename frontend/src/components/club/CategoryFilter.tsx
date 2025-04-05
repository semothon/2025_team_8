"use client";

export interface FilterType {
  id: number;
  name: string;
}

export const categoryFilter: FilterType[] = [
  { id: 1, name: "전체" },
  { id: 2, name: "중앙동아리" },
  { id: 3, name: "과동아리" },
  { id: 4, name: "모임" },
  { id: 5, name: "스터디" },
];

export const detailFilter: FilterType[] = [
  { id: 1, name: "전체" },
  { id: 2, name: "연행" },
  { id: 3, name: "학술" },
  { id: 4, name: "체육" },
  { id: 5, name: "봉사" },
  { id: 6, name: "종교" },
  { id: 7, name: "IT프로젝트" },
  { id: 8, name: "취미교양" },
  { id: 9, name: "전시창작" },
  { id: 10, name: "기타" },
];

interface ClubFilterProps {
  filters: FilterType[];
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
}

export default function ClubFilter({ filters, selected, onSelect }: ClubFilterProps) {
  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onSelect(filter)}
          className={`px-4 py-2 rounded-full ${
            selected.id === filter.id
              ? "text-white bg-gray-800"
              : "text-gray-800 bg-gray-200"
          }`}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}
