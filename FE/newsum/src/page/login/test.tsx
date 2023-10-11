import React, { useState, useEffect } from 'react'
import LoginModal from './loginModal';

import { useRecoilState } from 'recoil';
import { LoginModalIsOpenAtom } from '../../recoil/atoms/LoginModalAtom';

function LoginTest() {
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(LoginModalIsOpenAtom);
  const [isAnimating, setIsAnimating] = useState(false);
  const openLoginModal = () => {
    setLoginModalOpen(true)
  }

  // modal FadeIn, FadeOut를 위한 시간 지연
  useEffect(() => {
    if (loginModalOpen) {
      setIsAnimating(true)
    } else {
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }
  }, [loginModalOpen])

  return (
    <>
      <button onClick={ openLoginModal }>로그인</button>
      {(loginModalOpen || isAnimating) && (<LoginModal />)}
    </>
  )
} 

export default LoginTest;