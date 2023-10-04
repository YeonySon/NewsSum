import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseInstance } from '../../hook/AxiosInstance';

import { useRecoilState, useRecoilValue } from 'recoil';
import { SignUpAtom } from '../../recoil/atoms/SignUpAtom';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

import { CheckCookie } from '../../hook/token';

import { 
  NavButtonBox,
  NavButton,
  SignUpPage, 
  Container, 
  LogoTag,
  SelectContainer,
  SelectBox,
  SelectItem,
  ContentWordTag,
  InputWordTag,

  DivLine,
  SelectedContainer,
  SelectedBox,
  SelectedItem,
  DeleteButton,

  NextButton,
} from '../signup/signUp';

// pageType === 0은 SignUP
// pageType === 1는 myInfo/keyword
function KeywordComponent({ pageType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(SignUpAtom);
  const userId = useRecoilValue(MyInfoAtom);
  const buttonName = ['다음', '저장'];
  
  useEffect(() => {
    // 로그인 여부 확인
    if (pageType === 1) {
      CheckCookie();
    }

    // 서버에 데이터 요청
    const responseData = async () => {
      await BaseInstance.get('/api/user/techstack')
        .then((response) => {
          setItems(response.data.data.map((item: {tsName: string}) => item.tsName))
        })
        .catch((error) => [] as string[])
    }
    responseData()
  }, [])

  const [items, setItems] = useState<string[]>([])
  const [checkedList, setCheckedList] = useState<number[]>(() => {
    if (!!formData.tech) {
      return formData.tech.map(item => item - 1);
    }
    return []
  });
  const [itemStates, setItemStates] = useState<boolean[]>(() => {
    const initialStates = new Array(items.length).fill(false);
    if (!!formData.tech) {
      formData.tech.forEach((idx) => initialStates[idx - 1] = true)
    }
    return initialStates;
  })


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
    if (checkedList.length < 5 || checkedList.includes(index) ) {
      const newitemStates = [...itemStates]
      newitemStates[index] = !newitemStates[index]
      setItemStates(newitemStates)
      handleCheckedList(index, newitemStates[index])
    } 
  }

  const finalCheck = async () => {
    if (checkedList.length === 0) {
      alert('하나 이상의 직무를 선택해주세요')
      return;
    }

    // 관심기술 recoil에 저장
    const newData = checkedList.map(item => item + 1)
    const data = {tech: newData}
    setFormData((prev) => ({...prev, ...data}))

    if (pageType === 0) {
      navigate('/signup/3') // page 이동
    } 
    
    if (pageType === 1) {
      const requestBodyJSON = JSON.stringify(newData);
      await BaseInstance.patch(`/api/mypage/tech/${userId}`, requestBodyJSON)
      .then((resposne) => {
        console.log('이거나오나요')
        console.log(resposne)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }


  return (
    <SignUpPage>
      {pageType === 0 &&
        <LogoTag><p>NewSum</p></LogoTag>
      }
      <Container>
        {pageType === 0 &&
          <NavButtonBox>
            <NavButton $isActive={false} />
            <NavButton $isActive={true} />
            <NavButton $isActive={false} />
          </NavButtonBox>
        }
        
        <SelectContainer>
          <ContentWordTag>
            <p>관심이 있는</p>
            <p>기술스택을 골라주세요.</p>
            <p>(최대 5개 선택 가능)</p>
          </ContentWordTag>

          <SelectBox>
            {items.map((item, idx) => (
              <SelectItem
                key={idx}
                $isActive={itemStates[idx]}
                onClick={()=>handleItemClick(idx)}
              >
                {item}
              </SelectItem>
            ))}
          </SelectBox>
        </SelectContainer>

        <InputWordTag><p>선택한 기술 스택</p></InputWordTag>
        <DivLine />
        <SelectedContainer>
          {checkedList.map((item, idx) => (
            <SelectedBox key={idx}>
              <SelectedItem>{items[item]}</SelectedItem>
              <DeleteButton onClick={()=>handleItemClick(item)}>x</DeleteButton>
            </SelectedBox>

          ))}
        </SelectedContainer>

        <NextButton onClick={ finalCheck }>{buttonName[pageType]}</NextButton>
      </Container>
    </SignUpPage>
  )
}

export default KeywordComponent;