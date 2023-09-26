import { atom } from "recoil";

export const LoginModalIsOpenAtom = atom<boolean>({
  key: 'LoginModalIsOpenAtom',
  default: false,
})