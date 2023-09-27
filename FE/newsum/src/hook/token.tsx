import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';

export const CheckCookie = () => {
  const navigate = useNavigate();

  if (cookie.load('accessToken') === undefined) {
    alert('로그인이 필요한 서비스입니다.')
    navigate('/');
  } 
};