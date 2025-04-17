export interface Event {
  id: string;
  title: string;
  date: Date;
  time?: string;
  description?: string;
}

// Sample events data for April 2025
export const events: Event[] = [
  {
    id: "1",
    title: "1학년 캘린더 - 동아리 1차 서류 지원 마감",
    date: new Date(2025, 3, 5), // April 5th, 2025
    description: "하루종일",
  },
  {
    id: "2",
    title: "전체 캘린더 - 동아리 일정 테스트동아리",
    date: new Date(2025, 3, 5), // April 5th, 2025
    description: "하루종일",
  },
  {
    id: "3",
    title: "전체 캘린더 - 동아리 회의",
    date: new Date(2025, 3, 5), // April 5th, 2025
    time: "18:00~19:00",
  },
];
