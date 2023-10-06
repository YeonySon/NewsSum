// 라이브러리
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// recoil import
import { useRecoilState } from 'recoil';
import { SignUpAtom } from '../../recoil/atoms/SignUpAtom';

// axios instance
import { BaseInstance } from '../../hook/AxiosInstance';

import { 
  NavButtonBox,
  NavButton,
  SignUpPage, 
  Container, 
  LogoTag,
  InputWordTag,
  InputBox,
  InputTag,
  WarningMessageTag,
  NextButton,
  EmailButton,
  CheckButton,
  TimeTag,
  
} from '../../components/signup/signUp';

function SignUp1() {
  const page = 1;
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(SignUpAtom); // recoil data

  // 이름
  const [name, setName] = useState(formData.name);
  const [nameMessageType, setNameMessageType] = useState(0);
  const nameWarningMessage = ['.', '이름을 입력해 주세요.']

  // 이메일
  const [email, setEmail] = useState(formData.email);
  const [emailMessageType, setEmailMessageType] = useState(0);  // 이메일 warning 메세지 타입
  const emailWarningMessage = ['.', '인증코드가 전송되었습니다.', '이메일 정보를 다시 확인해주세요.', '이미 존재하는 이메일 입니다.']
  const [isSendCode, setIsSendCode] = useState(false);
  const [responseCode, setResponseCode] = useState(''); // 서버로부터 응답받은 인증 코드

  // 인증코드
  const [code, setCode] = useState('');
  const [codeMessageType, setCodeMessageType] = useState(0);  // 인증코드 warning 메세지 타입
  const codeWarningMessage = ['.', '인증되었습니다', '인증코드를 다시 확인해주세요.', '인증코드를 재전송 해주세요.']
  const [authenticationTime, setAuthenticationTime] = useState(10);  // 인증시간은 5분
  const minites: string = Math.floor(authenticationTime / 60).toString().padStart(2, '0'); 
  const seconds: string = Math.floor(authenticationTime % 60).toString().padStart(2, '0'); 

  const [codeIsCheck, setCodeIsCheck] = useState(false);                  // 인증코드 체크 여부

  // 비밀번호 및 비밀번호 확인
  const [password, setPassword] = useState('');
  const [passwordMessageType, setPasswordMessageType] = useState(0);  // 비밀번호 warning 메세지 타입
  const passwordWarningMessage = ['.', '사용 가능한 비밀번호입니다.', '8~16자의 영문, 숫자, 특수기호를 포함해 주세요.']

  const [checkPassword, setCheckPassword] = useState('');
  const checkPasswordWarningMessage = ['.', '확인되었습니다.', '비밀번호가 일치하지 않습니다.']

  const passwordIsCheck = password === checkPassword;

  // 생년월일
  const [birthDate, setBirthDate] = useState(formData.birthDate);
  const birthDateWarningMessage = ['.', '.', '생년월일을 다시 확인해주세요. (ex 20230101)']
  const [birthDateIsCheck, setBirthDateIsCheck] = useState(false);

  const handleName = (e) => {
    const newName = e.target.value
    setName(newName);
    if (newName.trim().length === 0) {
      setNameMessageType(1);
    } else {
      setNameMessageType(0);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsSendCode(false);   // 이메일이 변경되었기에 인증 전송 여부 초기화
    setCodeIsCheck(false);  // 이메일이 변경되었기에 인증코드 확인 여부 초기화
  }

  // 이메일 유효성 검사 & 중복 검사 & 인증 번호 전송
  const handleEmailButton = async() => {

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (emailRegEx.test(email)) {

      // 서버에 요청
      BaseInstance.get(`/api/user/id?email=${email}`, {headers: {}})
        .then((response) => {
          if (response.data.statusCode === 400) {
            setEmailMessageType(3);
          } else {
            console.log(response.data.data)
            setIsSendCode(true)             // 코드 전송 여부
            setResponseCode(response.data.data)   // 전달받은 인증 코드 저장
            setAuthenticationTime(300)      // 인증시간 5분 설정
            setEmailMessageType(1);         // 인증코드가 전송되었습니다.
            setCodeMessageType(0);          // 인증코드 warning message 초기화
            setCodeIsCheck(false)           // 코드 인증 여부 초기화
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setEmailMessageType(2)            // 이메일 정보를 다시 확인해주세요.
    }
  }

  // 인증번호 시간 제한
  useEffect(() => {
    if (isSendCode && !codeIsCheck) {
      if (authenticationTime > 0) {
        const interval = setInterval(() => {
          setAuthenticationTime((prev) => prev - 1)
        }, 1000);
  
        return () => clearInterval(interval);
      }
  
      if (authenticationTime === 0) {
        setIsSendCode(false)    // 코드 전송 여부 초기화
        setCodeMessageType(3);  // 인증번호 재 전송 필요
      }
    }
  })

  // 인증번호 확인
  const handleCheckButton = () => {
    if (isSendCode && !codeIsCheck) {
      if (responseCode === code) {
        setCodeIsCheck(true)
        setCodeMessageType(1);  // 인증되었습니다
      } else {
        setCodeMessageType(2);  // 인증코드를 다시 확인해주세요.
      }
    }
  }

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

  // 생년월일 유효성 확인
  const handleBirthDate = (e) => {
    const newBirthDate = e.target.value;
    setBirthDate(newBirthDate);

    if (isValidBirthDate(newBirthDate)) {
      setBirthDateIsCheck(true)
    } else {
      setBirthDateIsCheck(false)
    }
  }

  // 생년월일 유효성 확인 함수
  const isValidBirthDate = (data:string) => {

    if (data.length !== 8) {
      return false
    }

    if (!/^\d+$/.test(data)) {
      return false;
    }

    // 연도, 월, 일을 추출
    const year = parseInt(data.substring(0, 4), 10);
    const month = parseInt(data.substring(4, 6), 10);
    const day = parseInt(data.substring(6, 8), 10);

    // 연도, 월, 일이 유효한지 확인
    if (year < 1900 || year > new Date().getFullYear() || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }
    
    // 실제 존재하는 날짜인지 확인
    const date = new Date(year, month - 1, day); // month는 0부터 시작하므로 -1
    if (isNaN(date.getTime())) {
      return false;
    }

    return true;
  }

  // 다음 페이지 넘어가기 전 전체 검사 함수
  const finalCheck = () => {
    // 이름 검사
    if (name.trim().length === 0) {
      alert('이름을 입력해주세요.')
      return;
    }
    // 이메일 인증 검사
    if (!codeIsCheck) {
      alert('이메일 인증이 필요합니다.')
      return
    } 
    // 비밀번호 및 비밀번호 확인 검사
    if (passwordMessageType !== 1 || !passwordIsCheck) {
      alert('비밀번호를 다시 확인해주세요')
      return

    }
    // 생년월일 검사
    if (!birthDateIsCheck) {
      alert('생년월일을 다시 확인해주세요.')
      return;
    }

    // 이름, 이메일, 비밀번호, 생년월일을 recoil로 저장
    const data = {email: email, password: password, name: name, birthDate: birthDate}
    setFormData((prev) => ({...prev, ...data}))
    
    // page 이동
    navigate('/signup/2')
  }

  // 시작 시 최초 검사
  useEffect(() => {
    // 이메일 인증 여부 검사
    if (!!formData.email) {
      setCodeIsCheck(true);
    }

    // 생년월일 유효성 검사
    if (isValidBirthDate(formData.birthDate)) {
      setBirthDateIsCheck(true)
    } else {
      setBirthDateIsCheck(false)
    }
  }, [])
  return (
    <SignUpPage>
      <LogoTag onClick={() => (window.location.href = '/news')}><p>NewSum</p></LogoTag>
      <Container>

        <NavButtonBox>
          <NavButton $isActive={page === 1} />
          <NavButton $isActive={page === 2} />
          <NavButton $isActive={page === 22} />
          <NavButton $isActive={page === 3} />
        </NavButtonBox>

        {/* 이름 */}
        <InputWordTag><p>이름</p></InputWordTag>
        <InputBox>
          <InputTag value={ name } onChange={ handleName } placeholder='이름' />
        </InputBox>

        <WarningMessageTag $isNotActive={ !nameMessageType }  $isSuccess={ false }>
          {nameWarningMessage[nameMessageType]}
        </WarningMessageTag>

        {/* 이메일 */}
        <InputWordTag><p>이메일</p></InputWordTag>
        <InputBox>
          <InputTag value={ email } onChange={ handleEmail } placeholder='이메일'/>
          <EmailButton $isActive={ emailMessageType !== 1 } onClick={ handleEmailButton }>
            {emailMessageType !== 1 ? '인증코드 전송': '인증코드 재전송'}
          </EmailButton>
        </InputBox>
        <WarningMessageTag $isNotActive={ !emailMessageType } $isSuccess={ emailMessageType === 1 }>
          {emailWarningMessage[emailMessageType]}
        </WarningMessageTag>

        {/* 인증코드 */}
        <InputWordTag><p>인증코드</p></InputWordTag>
        <InputBox>
          <InputTag value={ code } onChange={(e) => setCode(e.target.value) } placeholder='인증코드' />
          <TimeTag $isNotActive={ !isSendCode } $isSuccess={!!authenticationTime}>
            <p>{authenticationTime !== 0 ? `${minites}:${seconds}` : '시간초과'}</p>
          </TimeTag>
          <CheckButton $isActive={ isSendCode } onClick={ handleCheckButton }>확인</CheckButton>
        </InputBox>
        <WarningMessageTag $isNotActive={ !codeMessageType } $isSuccess={ codeMessageType === 1 }>
          {codeWarningMessage[codeMessageType]}
        </WarningMessageTag>

        {/* 비밀번호 */}
        <InputWordTag><p>비밀번호</p></InputWordTag>
        <InputBox>
          <InputTag type='password' value={password} onChange={(e)=>setPassword(e.target.value)} onBlur={ handlePassword} placeholder='비밀번호 (8 ~ 16자의 영문, 숫자, 특수기호 포함)' />
        </InputBox>

        <WarningMessageTag $isNotActive={ !passwordMessageType } $isSuccess={ passwordMessageType === 1 }>
          {passwordWarningMessage[passwordMessageType]}
        </WarningMessageTag>

        <InputWordTag><p>비밀번호 확인</p></InputWordTag>
        <InputBox>
          <InputTag type='password' onChange={(e) => setCheckPassword(e.target.value) } placeholder='비밀번호 확인' />
        </InputBox>

        <WarningMessageTag $isNotActive = { !password || !checkPassword } $isSuccess={passwordIsCheck}>
          {passwordIsCheck ? checkPasswordWarningMessage[1] : checkPasswordWarningMessage[2] }
        </WarningMessageTag>

        <InputWordTag><p>생년월일</p></InputWordTag>
        <InputBox>
          <InputTag value={birthDate} onChange={(e) => setBirthDate(e.target.value)} onBlur={ handleBirthDate } placeholder='YYYYMMDD' />
        </InputBox>
        <WarningMessageTag $isNotActive = { !birthDate || birthDateIsCheck } $isSuccess={birthDateIsCheck}>
          {birthDateIsCheck ? birthDateWarningMessage[1] : birthDateWarningMessage[2] }
        </WarningMessageTag>
        
        <NextButton onClick={ finalCheck }>다음</NextButton>
      </Container>
    </SignUpPage>
  );
};

export default SignUp1;