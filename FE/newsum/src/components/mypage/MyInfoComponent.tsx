import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// state, recoil import
import { useRecoilState, useRecoilValue } from 'recoil';
import { SignUpAtom } from '../../recoil/atoms/SignUpAtom';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

// axios 요청
import { BaseInstance } from '../../hook/AxiosInstance';

import { 
  SignUpPage, 
  Container, 

  MyInfoBox,
  MyInfoBoxTitle,
  MyInfoBoxDiv,
  MyInfoBoxContent,
  MyInfoBoxInput,
  MyInfoWarningMessageTag,
  MyInfoButton,
  
} from '../signup/signUp';


function MyInfoComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(SignUpAtom); // recoil data
  const userId = useRecoilValue(MyInfoAtom);  // user Id

  // 비밀번호 및 비밀번호 확인
  const [password, setPassword] = useState('');
  const [passwordMessageType, setPasswordMessageType] = useState(0);  // 비밀번호 warning 메세지 타입
  const passwordWarningMessage = ['.', '사용 가능한 비밀번호입니다.', '8~16자의 영문, 숫자, 특수기호를 포함해 주세요.']

  const [checkPassword, setCheckPassword] = useState('');
  const checkPasswordWarningMessage = ['.', '확인되었습니다.', '비밀번호가 일치하지 않습니다.']

  const passwordIsCheck = password === checkPassword;

  // 비밀번호 유효성 검증
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegEx = /^[A-Za-z0-9@$!%*?&#]{8,16}$/
    if (newPassword.match(passwordRegEx) === null) {
      setPasswordMessageType(2);  // 8~16자의 영문, 숫자, 특수기호를 포함해 주세요.
    } else {
      setPasswordMessageType(1);  // 사용 가능한 비밀번호입니다.
    }
  }

  // 비밀번호 변경
  const editCheck = async () => {

    // 비밀번호 및 비밀번호 확인 검사
    if (passwordMessageType !== 1 || !passwordIsCheck) {
      alert('비밀번호를 다시 확인해주세요')
      return
    }

    const data = {password: password}
    const requestBodyJSON = JSON.stringify(data);

    await BaseInstance.patch(`/user/${userId}`, requestBodyJSON)
      .then((response) => {
        alert('비밀번호가 변경되었습니다.')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const leaveCheck = () => {
    console.log('탈퇴 기능')
  }

  useEffect(() => {
    BaseInstance.get(`/user/${userId}`)
      .then((response) => {
        const data = {
          email: response.data.data.email,
          name: response.data.data.name,
          birthDate: response.data.data.birthDate
        }
        setFormData((prev) => ({...prev, ...data}))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <SignUpPage>
      <Container>
        {/* 이름 */}
        <MyInfoBox>
          <MyInfoBoxTitle>이름</MyInfoBoxTitle>
          <MyInfoBoxDiv>|</MyInfoBoxDiv>
          <MyInfoBoxContent>{formData.name}</MyInfoBoxContent>
        </MyInfoBox>

        <MyInfoBox>
          <MyInfoBoxTitle>이메일</MyInfoBoxTitle>
          <MyInfoBoxDiv>|</MyInfoBoxDiv>
          <MyInfoBoxContent>{formData.email}</MyInfoBoxContent>
        </MyInfoBox>

        {/* 비밀번호 */}
        <MyInfoBox>
          <MyInfoBoxTitle><p>비밀번호</p></MyInfoBoxTitle>
          <MyInfoBoxDiv>|</MyInfoBoxDiv>
          <MyInfoBoxInput type='password' value={password} onChange={(e)=>setPassword(e.target.value)} onBlur={ handlePassword} placeholder='비밀번호 (8 ~ 16자의 영문, 숫자, 특수기호 포함)' />
        </MyInfoBox>
        <MyInfoWarningMessageTag $isNotActive={ !passwordMessageType } $isSuccess={ passwordMessageType === 1 }>
          {passwordWarningMessage[passwordMessageType]}
        </MyInfoWarningMessageTag>

        <MyInfoBox>
          <MyInfoBoxTitle><p>비밀번호 확인</p></MyInfoBoxTitle>
          <MyInfoBoxDiv>|</MyInfoBoxDiv>
          <MyInfoBoxInput type='password' onChange={(e) => setCheckPassword(e.target.value) } placeholder='비밀번호 확인' />
        </MyInfoBox>
        <MyInfoWarningMessageTag $isNotActive = { !password || !checkPassword } $isSuccess={passwordIsCheck}>
          {passwordIsCheck ? checkPasswordWarningMessage[1] : checkPasswordWarningMessage[2] }
        </MyInfoWarningMessageTag>

        {/* 생년월일 */}
        <MyInfoBox>
          <MyInfoBoxTitle>생년월일</MyInfoBoxTitle>
          <MyInfoBoxDiv>|</MyInfoBoxDiv>
          <MyInfoBoxContent>{`${formData.birthDate.slice(0, 4)}-${formData.birthDate.slice(4, 6)}-${formData.birthDate.slice(6)}`}</MyInfoBoxContent>
        </MyInfoBox>

        <MyInfoBox>
          <MyInfoButton $isLeft={true} onClick={ editCheck }>수정</MyInfoButton>
          <MyInfoButton $isLeft={false} onClick={ leaveCheck }>탈퇴</MyInfoButton>
        </MyInfoBox>
      </Container>
    </SignUpPage>
  );
};

export default MyInfoComponent;