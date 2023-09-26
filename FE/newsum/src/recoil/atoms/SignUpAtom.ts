import { atom, selector } from "recoil";

export interface signUpAtomTypes {
  email: string;         // email
  password: string;   // 비밀번호
  name: string;       // 이름
  birthDate: string;  // 생년월일, YYYYMMDD
  tech: number[];     // 관심기술
  headline: number[]; // 헤드라인
}

export const SignUpAtom = atom<signUpAtomTypes>({
  key: 'SignUpAtom',
  default: {
    email: '',    
    password: '',
    name: '',
    birthDate: '',
    tech: [],
    headline: []
  },
})