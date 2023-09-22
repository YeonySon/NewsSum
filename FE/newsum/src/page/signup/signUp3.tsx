import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SignUpAtom } from '../../recoil/atoms/SignUpAtom';

import { 
  NavButtonBox,
  NavButton,
  SignUpPage, 
  Container, 
  LogoTag,

  InputWordTag,
  HeadlineContainer,
  HeadlineBox,

  NextButton,
} from '../../components/signup/signUp';

function SignUp3() {
  const page = 3
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(SignUpAtom);

  const items = [
    '헤드라인 헤드라인 헤드라인 헤드라인',
    '헤드라인 헤드라인 헤드라인 헤드라인',
    '헤드라인 헤드라인 헤드라인 헤드라인',
    '헤드라인 헤드라인 헤드라인 헤드라인',
    '헤드라인 헤드라인 헤드라인 헤드라인',
    '헤드라인 헤드라인 헤드라인 헤드라인',
    '헤드라인 헤드라인 헤드라인 헤드라인',
  ] 

  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [itemStates, setItemStates] = useState<boolean[]>(new Array(items.length).fill(false))

  const handleCheckedList = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, index])
      return;
    }
    if (!isChecked && checkedList.includes(index)) {
      setCheckedList(checkedList.filter((item) => item !== index));
      return;
    }
    return;
  };

  const handleItemClick = (index: number) => {
    if (checkedList.length < 3 || checkedList.includes(index) ) {
      const newitemStates = [...itemStates]
      newitemStates[index] = !newitemStates[index]
      setItemStates(newitemStates)
      handleCheckedList(index, newitemStates[index])
    } 
  }

  const finalCheck = async() => {
    if (checkedList.length === 0) {
      alert('하나 이상의 직무를 선택해주세요')
      return;
    }

    // 헤드라인 저장
    const data = {headline: checkedList}
    setFormData((prev) => ({...prev, ...data}))
    
    // 서버로 요청 (회원가입)
    // await axios
    // .post('/', formData)
    // .then((response) => {
    //   // recoil SignUpAtom 초기화
      


    //   // page 이동 (home으로 이동)
    //   // navigate('/')
    //   window.location.href = '/singup/1'
    // })
    // .catch((error) => {
    //   console.log(error)
    // })

    window.location.href = '/signup/1'
  }

  // formData 체크 시, 필요한 값이 없다면 해당 페이지로 보냄
  useEffect(() => {
    if ( !formData.name || !formData.id || !formData.password && !formData.birthdate ) {
      alert('회원정보를 확인해주세요.')
      navigate('/signup/1')
    } else if ( formData.tech.length === 0 ) {
      alert('관심기술 직무를 선택해주세요.')
      navigate('/signup/2')
    } 
  }, formData)

  return (
    <SignUpPage>
      <LogoTag><p>NewSum</p></LogoTag>
      <Container>

        <NavButtonBox>
          <NavButton $isActive={page === 1} />
          <NavButton $isActive={page === 2} />
          <NavButton $isActive={page === 3} />
        </NavButtonBox>
        
        <InputWordTag>
          <p>마음에 드는 헤드라인을 선택해주세요</p>
          <p>(최대 3개)</p>
        </InputWordTag>

        <HeadlineContainer>
            {items.map((item, idx) => (
              <HeadlineBox
                key={idx}
                $isActive={itemStates[idx]}
                onClick={()=>handleItemClick(idx)}
              >
                {item}
              </HeadlineBox>
            ))}
        </HeadlineContainer>
        <NextButton onClick={ finalCheck }>완료</NextButton>
      </Container>
    </SignUpPage>

  );
};

export default SignUp3;