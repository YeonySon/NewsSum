import { atom } from "recoil";

export const LeaveModalIsOpenAtom = atom<boolean>({
  key: 'LeaveModalIsOpenAtom',
  default: false,
})