import { atom, selector } from "recoil";

export interface signUpAtomTypes {
  id: string;         // email
  password: string;   // 비밀번호
  name: string;       // 이름
  birthdate: string;  // 생년월일, YYYYMMDD
  tech: number[];     // 관심기술
  headline: number[]; // 헤드라인
}

export const SignUpAtom = atom<signUpAtomTypes>({
  key: 'SignUpAtom',
  default: {
    id: '',    
    password: '',
    name: '',
    birthdate: '',
    tech: [],
    headline: []
  },
})

// const SignUpUpdateSelector = selector({
//   key: 'SignUpUpdateSelector',
//   get: ({get}) => {
//     const SignUp = get(SignUpAtom);
//     return 원본변형값
//   }
// })
