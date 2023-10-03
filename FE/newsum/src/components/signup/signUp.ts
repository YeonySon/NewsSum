import styled, { css } from "styled-components";

// 공통
interface IsActive {
  $isActive: boolean;
}

interface WarningMessageProps {
  $isNotActive: boolean;
  $isSuccess: boolean;
}

const successType =`
  color: #fff;
`
const errorType = `
  color: #000;
`

const type1 =`
  background-color: #0583f2;
  color: #fff;
`
const type2 = `
  background-color: #fff;
  color: #000;
`
const type3 =`
  background-color: #E1E1E1;
  color: #2B2B2B;
`

// Common
export const SignUpPage = styled.div`
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  flex-direction:column;
  align-items: center;
  overflow: auto;
`

export const Container = styled.div`
  position: relative;
  width: 400px;
  height: 560px;
  margin-top: 30px;
  padding: 15px 0 ;
  background-color: rgba(217, 217, 217, 0.00);
  border: 2px solid #E5E5E5;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
`

export const LogoTag = styled.div`
  width: 350px;
  margin: 50px 0px 0px;
  text-align: center;

  p {
    margin: 0;
    color: #0583F2;
    font-size: 32px;
    font-weight: bold;
  }
`

export const NavButtonBox = styled.div`
  width: 350px;
  height: 10px;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: 2px;
`

export const NavButton = styled.button<IsActive>`
  width: 36px;
  height: 8px;
  border: 0;
  border-radius: 20px;
  ${({ $isActive }) => $isActive ? `background-color: #0583F2;` : `background-color: #E5E5E5;`}
`


export const InputWordTag = styled.div`
  width: 350px;
  margin: 10px 0;
  p {
    margin: 0;
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }
`

export const InputBox = styled.div`
  position: relative;
  width: 350px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InputTag = styled.input`
  left: 0;
  width: 350px;
  height: 30px;
  margin:0;
  padding: 0;
  border: 1px solid #9ba4b5;
  border-radius: 5px;
  text-indent: 10px;
  font-size: 14px;
  &::placeholder {
    text-indent: 10px;
  }
`

export const WarningMessageTag = styled.div<WarningMessageProps>`
  width: 350px;
  height: 10px;
  margin: 0;
  font-size: 10px;
  ${({ $isNotActive }) => $isNotActive && `visibility: hidden;`}
  ${({ $isSuccess }) => ($isSuccess ? `color: #004FFE;` : `color: #FF0000;`)}
`

export const EmailButton = styled.button<IsActive>`
  position: absolute;
  right: 10px;
  /* width: 100px; */
  height: 24px;
  border: 0;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  ${ type1 }
  ${({ $isActive }) => ($isActive ? 'width: 100px;' : 'width: 120px;')}
  @media (max-width: 400px) {
    height: 28px;
  }
`

export const CheckButton = styled.button<IsActive>`
  position: absolute;
  right: 10px;
  width: 60px;
  height: 24px;
  border: 0;
  border-radius: 5px;
  font-size: 12px;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
  ${({ $isActive }) => ($isActive ? type1 : type3)}
  @media (max-width: 400px) {
    height: 28px;
  }
`
export const TimeTag = styled.div<WarningMessageProps>`
  position: absolute;
  right: 85px;
  width: 75px;
  /* height: 30px; */
  margin: 10px 0;

  ${({ $isNotActive }) => $isNotActive && `visibility: hidden;`}
  
  color: #757575;
  
  p {
    margin: 0;
    ${({ $isSuccess }) => !$isSuccess && `color: red;`}
    font-size: 14px;
    font-weight: 400;
    text-align: right;
  }
`

export const NextButton = styled.button`
  position: absolute;
  bottom: 15px;
  width: 350px;
  height : 35px;
  margin-top: 10px;
  border: 0;
  border-radius: 10px;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    font-size: 18px;
  }

  ${ type1 }
  @media (max-width: 400px) {   
    width: 350px;
    height: 40px;
  }
`

// page 2번
export const SelectContainer = styled.div`
  position: relative;
  width: 350px;
  height: auto;
  margin: 0px 0px 60px;
  display: flex;
  justify-content: center;
  align-items: stretch;
`

export const SelectBox = styled.div`
  width: 150px;
  height: 200px;
  padding: 5px;
  background-color: #F7F7F7;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바 너비 지정 */
    background-color: rgba(5, 131, 242, 0.20);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0583F2; /* 스크롤바 색상 지정 */
    border-radius: 10px;
  }
`

export const SelectItem = styled.p<IsActive>`
  width: 140px;
  height: 25px;
  margin: 3px 0;
  border-radius: 5px;
  font-size: 14px;
  text-indent: 10px;
  transition: transform 0.1s;
  ${({ $isActive }) => $isActive && type1}

  &:hover {
    transform: scale(1.04);
  }
`

export const ContentWordTag = styled.div`
  width: 200px;
  margin: 10px 0;
  p {
    margin: 0;
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }
`

export const SelectedContainer = styled.div`
  position: relative;
  width: 350px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  gap: 30px;
`

export const SelectedBox = styled.div`
  position: relative;
  width: 80px;
  height: 35px;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  `

export const SelectedItem =styled.p`
  text-indent: 5px;
  font-size: 10px;
`

export const DeleteButton = styled.button`
  position: absolute;
  right: 5px;
  background-color: #fff;
  border: 1px solid #f00;
  border-radius: 50%;
  color: #f00;
`

export const DivLine = styled.div`
  width: 370px;
  margin-bottom: 30px;
  border-bottom: 1px solid #E5E5E5; 
`

// page3
export const HeadlineContainer = styled.div`
  position: relative;
  width: 350px;
  height: auto;
  margin: 30px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

export const HeadlineBox = styled.button<IsActive>`
  width: 350px;
  height: 40px;
  margin-bottom: 25px;
  border: 1px solid #000;
  border-radius: 10px;
  ${({ $isActive }) => ($isActive ? type1 : type2)}
`

// MyInfo
export const MyInfoBox = styled.div`
  width: 350px;
  height: 50px;
  color: #000;
  font-size: 14px;
  display: flex;
  align-items: center;
` 

export const MyInfoBoxTitle = styled.div`
  width: 100px;
`

export const MyInfoBoxDiv = styled.div`
  width: 20px;
  color: #9AA3AA;
`

export const MyInfoBoxContent = styled.div`
  width: 100px;
`

export const MyInfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const MyInfoBoxInput = styled(InputTag)`
  width: 230px;
  font-size: 10px;

`

export const MyInfoWarningMessageTag = styled(WarningMessageTag)`
  width: 330px;
  text-align: right;
`

interface PositionProps {
  $isLeft: boolean;
}

export const MyInfoButton = styled(NextButton)<PositionProps>`
  position: absolute;
  width: 50px;
  bottom: 40%;
  ${({ $isLeft }) => ($isLeft ? `right: 70px;` : 
    css`
      right: 10px;
      background-color: #F2053E;
    `)}
`