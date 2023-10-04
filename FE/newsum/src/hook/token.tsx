import cookie from 'react-cookies';

export function CheckCookie() {
  if (cookie.load('accessToken') === undefined) {
    alert('로그인이 필요한 서비스입니다.')
    window.location.href = '/news'
  } 
}