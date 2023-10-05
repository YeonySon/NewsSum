import React, { useEffect } from 'react';
import { useState } from 'react';
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
} from '../../components/signup/signUp';

function SignUp22() {
  const page = 22
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(SignUpAtom);

  useEffect(() => {
    // 서버에 데이터 요청
    const responseData = async () => {
      await BaseInstance.get('/api/user/jobs')
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

  const handleItemClick = (index: number) => {
      const newitemStates = [...itemStates]
      newitemStates[index] = !newitemStates[index]
      if (!!checkedList) {              // 체크리스트가 존재하는 경우
        if (checkedList[0] === index) { // 체크리스트의 인덱스와 동일한 경우
          setCheckedList([])
        } else {                        // 체크리스트와 인덱스가 다른경우
          newitemStates[checkedList[0]] = false
          setCheckedList([index])
        }
      } else {                          // 체크리스트가 존재하지 않으면
        setCheckedList([index])
      }
      setItemStates(newitemStates)
  }

  const finalCheck = () => {
    if (checkedList.length === 0) {
      alert('하나의 직무를 선택해주세요')
      return;
    }

    // 관심기술 recoil에 저장
    const newData = checkedList[0] + 1
    const data = {job: newData}
    setFormData((prev) => ({...prev, ...data}))
    
    // page 이동
    navigate('/signup/3')
  }

  return (
    <SignUpPage>
      <LogoTag><p>NewSum</p></LogoTag>
      <Container>

        <NavButtonBox>
          <NavButton $isActive={page === 1} />
          <NavButton $isActive={page === 2} />
          <NavButton $isActive={page === 22} />
          <NavButton $isActive={page === 3} />
        </NavButtonBox>
        
        <SelectContainer>
          <ContentWordTag>
            <p>관심이 있는 직무를</p>
            <p>한 개 골라주세요.</p>
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

        <NextButton onClick={ finalCheck }>다음</NextButton>
      </Container>
    </SignUpPage>

  );
};

export default SignUp22;