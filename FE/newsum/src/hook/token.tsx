import cookie from "react-cookies";

// recoil import
import { useSetRecoilState } from "recoil";
import { MyInfoAtom } from "../recoil/atoms/MyInfoAtom";

export function CheckCookie(setMyinfo) {
  // const setMyinfo = useSetRecoilState(MyInfoAtom);

  if (cookie.load("accessToken") === undefined) {
    setMyinfo(0);
    alert("로그인이 필요한 서비스입니다.");
    window.location.href = "/news";
  }
}
