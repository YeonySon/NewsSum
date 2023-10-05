import styled, { css, keyframes } from "styled-components";

interface WarningMessageProps {
  $isNotActive: boolean;
}

interface modalProps {
  $isActive: boolean;
}

export const ModalWindow = styled.div<modalProps>`
  position: fixed;
  background-color: rgba(217, 217, 217, 0.50);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 110;
  animation: ${({$isActive}) => $isActive ? modalIn : modalOut} 0.3s linear;
`

export const ModalContainer = styled.div`
  position: absolute;
  width: 480px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  border: 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const BoxContainer = styled.div`
  width: 300px;
  margin-top: 20px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const BoxColContainer = styled(BoxContainer)`
  margin-top: 30px;
  flex-direction: column;
`

export const WordTag = styled.p`
  margin-bottom: 20px;
  color: #000000;
  font-size: 32px;
`

export const WordTag2 = styled.p`
  margin-right: 20px;
  color: #9BA4B5;
  font-size: 12px;
`

export const WordTag3 = styled.p`
  color: #394867;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`

export const InputTag = styled.input`
  left: 0;
  width: 300px;
  height: 48px;
  margin:0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.50);
  border: 1px solid #9ba4b5;
  border-radius: 5px;
  text-indent: 10px;
  font-size: 14px;
  &::placeholder {
    text-indent: 10px;
  }
`

export const WarningMessageTag = styled.div<WarningMessageProps>`
  width: 300px;
  margin: 10px 0px 0px 10px;
  font-size: 12px;
  color: #FF0000;
  ${({ $isNotActive }) => $isNotActive && `visibility: hidden;`}
`

export const LoginButton = styled.button`
  width: 300px;
  height : 48px;
  margin-top: 45px;
  background-color: #394867;
  border: 0;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
  color: #fff;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    font-size: 16px;
  }

  @media (max-width: 400px) {   
    width: 300px;
    height: 40px;
  }
`

// 모달 창 애니메이션
const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const modalOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  } 
`