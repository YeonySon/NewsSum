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

function SignUp2() {
  const page = 2
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(SignUpAtom);

  useEffect(() => {
    // 서버에 데이터 요청
    const responseData = async () => {
      await BaseInstance.get('/user/techstack')
        .then((response) => {
          setItems(response.data.data.map((item: {tsName: string}) => item.tsName))
        })
        .catch((error) => [] as string[])
    }
    responseData()
  }, [])

  const [items, setItems] = useState<string[]>([])
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
    if (checkedList.length < 5 || checkedList.includes(index) ) {
      const newitemStates = [...itemStates]
      newitemStates[index] = !newitemStates[index]
      setItemStates(newitemStates)
      handleCheckedList(index, newitemStates[index])
    } 
  }

  const finalCheck = () => {
    if (checkedList.length === 0) {
      alert('하나 이상의 직무를 선택해주세요')
      return;
    }

    // 관심기술 recoil에 저장
    const newData = checkedList.map(item => item + 1)
    const data = {tech: newData}
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
          <NavButton $isActive={page === 3} />
        </NavButtonBox>
        
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

        <NextButton onClick={ finalCheck }>다음</NextButton>
      </Container>
    </SignUpPage>

  );
};

export default SignUp2;