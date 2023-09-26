import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  ModalWindow,
  ModalContainer,
  BoxContainer,
  BoxColContainer,
  InputTag,
  WarningMessageTag,
  LoginButton,
  WordTag,
  WordTag2,
  WordTag3,
} from '../../components/login/login';

import { useRecoilState } from 'recoil';
import { LoginModalIsOpenAtom } from '../../recoil/atoms/LoginModalAtom';

function LoginModal() {

  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(LoginModalIsOpenAtom);
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  }

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  
  const [password, setPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  // 로그인 버튼 클릭
  const finalCheck = () => {
    if (!emailValidCheck(email)) {
      return;
    }

    if (!passwordValidCheck(password)) {
      return;
    }

    // 유효성 검증되었으면 서버로 axios 요청
    // 만일 존재하지 않는 아이디면, 
    // setEmailIsValid(false)
    // 만일 비밀번호와 일치하지 않는겨웅
    // setPasswordIsValid(false)
    // 로그인에 성공한 경우, 모달창 닫기
    alert('로그인 성공')
    closeLoginModal()
  };

  // 이메일 유효성 검사
  const emailValidCheck = (data: string) => {
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (emailRegEx.test(data)) {
      setEmailIsValid(true);
      return true;
    } else {
      setEmailIsValid(false);
      return false;
    }
  };

  // 비밀번호 유효성 검사
  const passwordValidCheck = (data: string) => {
    const passwordRegEx = /^[A-Za-z0-9@$!%*?&]{8,16}$/
    if (data.match(passwordRegEx) === null) {
      setPasswordIsValid(false);
      return false;
    } else {
      setPasswordIsValid(true);
      return true;
    }
  };

  // 회원가입 페이지로 이동
  const moveSignUp = () => {
    closeLoginModal()
    navigate('/signup/1')
  }

  return (
    <ModalWindow $isActive={loginModalOpen} onClick={ closeLoginModal }>
      <ModalContainer onClick={(e) => e.stopPropagation()}>

        <WordTag>로그인</WordTag>
        <BoxColContainer>
          <InputTag onBlur={ (e) => setEmail(e.target.value) } placeholder="이메일"></InputTag>
          <WarningMessageTag $isNotActive={ emailIsValid }>이메일을 다시 확인해 주세요.</WarningMessageTag>
        </BoxColContainer>

        <BoxColContainer>
          <InputTag type='password' onBlur={ (e) => setPassword(e.target.value) } placeholder="비밀번호"></InputTag>
          <WarningMessageTag $isNotActive={ passwordIsValid }>비밀번호를 다시 확인해 주세요.</WarningMessageTag>
        </BoxColContainer>

        <LoginButton onClick={ finalCheck }>로그인</LoginButton>

        <BoxContainer>
          <WordTag2>아직 회원이 아니신가요?</WordTag2>
          <WordTag3 onClick={ moveSignUp }>회원가입</WordTag3>
        </BoxContainer>
      </ModalContainer>
    </ModalWindow>
  );
};

export default LoginModal;