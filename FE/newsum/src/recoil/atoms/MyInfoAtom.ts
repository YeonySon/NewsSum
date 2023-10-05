import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 1. 아무것도 설정 안 하고 쓰는 경우
// localStorage에 저장, key 이름은 'recoil-persist'로 저장됨
const { persistAtom } = recoilPersist();

// Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 함.
export const MyInfoAtom = atom<number>({
  key: 'MyInfoAtom',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})