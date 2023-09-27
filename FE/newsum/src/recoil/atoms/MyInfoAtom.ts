import { atom } from "recoil";

export const MyInfoAtom = atom<number>({
  key: 'MyInfoAtom',
  default: 0,
})