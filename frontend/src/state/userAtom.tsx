// src/store/atoms.ts
import { atom } from "jotai";

export const isLoggedInAtom = atom(false);

//backend 랑 대충 맞춰야 함 형식 대충... 
export interface UserInfo {
  id: number;
  nickname: string;
  clubIds: number[]; //가입한 동아리 ID 목록
  ManageIds: number[]; //관리하는 동아리 ID 목록

}

export const userAtom = atom<UserInfo | null>(null);
