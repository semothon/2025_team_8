import { atom } from "jotai";

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  replies?: Comment[];
}

export const commentsAtom = atom<Comment[]>([
  {
    id: 1,
    author: "최재민",
    content: "댓글 테스트입니다.",
    date: "2025. 03. 31. 20:03:47",
    replies: [
      {
        id: 2,
        author: "최재민",
        content: "대댓글입니다.",
        date: "2025. 03. 31. 20:03:47",
      },
      {
        id: 3,
        author: "최재민",
        content: "대댓글입니다.",
        date: "2025. 03. 31. 20:03:47",
      },
      {
        id: 4,
        author: "최재민",
        content: "대댓글입니다.",
        date: "2025. 03. 31. 20:03:47",
      },
    ],
  },
  {
    id: 2,
    author: "최재민",
    content: "댓글 테스트입니다.",
    date: "2025. 03. 31. 20:03:47",
    replies: [
    ]
  }
]);
