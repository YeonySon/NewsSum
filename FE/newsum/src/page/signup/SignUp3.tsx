import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseInstance } from '../../hook/AxiosInstance';

import { useRecoilState } from 'recoil';
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
  useEffect(() => {
    // 서버에 데이터 요청
    const responseData = async () => {
      await BaseInstance.get('/api/user/headline')
        .then((response) => {
          setItems(response.data.data.map((item: {name: string}) => item.name))
        })
        .catch((error) => [] as string[])
    }
    responseData()
  }, [])

  const [items, setItems] = useState<string[]>([])
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [itemStates, setItemStates] = useState<boolean[]>(new Array(items.length).fill(false))
  console.log('headline 데이터', formData.headline)
  const handleCheckedList = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setFormData((prev) => ({...prev, headline: [...formData.headline, index + 1]}))
      setCheckedList((prev) => [...prev, index])
      return;
    }
    if (!isChecked && checkedList.includes(index)) {
      setFormData((prev) => ({ ...prev, headline: formData.headline.filter((item) => item !== index+1) }))
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

    // 서버로 요청 (회원가입)
    const requestBodyJSON = JSON.stringify(formData);

    await BaseInstance.post('/api/user', requestBodyJSON)
      .then((resposne) => {
        console.log(resposne)
      })
      .catch((error) => {
        console.log(error)
      })

    // formData 초기화
    // 페이지 이동
    window.location.href = '/news'
  }

  // formData 체크 시, 필요한 값이 없다면 해당 페이지로 보냄
  useEffect(() => {
    if ( !formData.name || !formData.email || !formData.password && !formData.birthDate ) {
      alert('회원정보를 확인해주세요.')
      navigate('/signup/1')
    } else if ( formData.tech.length === 0 ) {
      alert('관심기술 직무를 선택해주세요.')
      navigate('/signup/2')
    } 
  }, [formData])

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