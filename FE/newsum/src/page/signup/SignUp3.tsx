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
    // const responseData = async () => {
    //   await BaseInstance.get('/api/user/headline')
    //     .then((response) => {
    //       setItems(response.data.data.map((item: {name: string}) => item.name))
    //     })
    //     .catch((error) => [] as string[])
    // }
    // responseData()

    // 더미 데이터
    const dummyData = [
      {id: 1, name: "아이폰15, 마케팅 대전...새벽배송, 스타 맞대결 예고"},    // 모바일
      {id: 2, name: "카카오 떠나는 남궁훈, AI 사업가‧장학재단 도전"},    // 인터넷/SNS
      {id: 3, name: "제이원아이티시스템, 스텔라사이버 ‘오픈 XDR’ 국내 총판 맡는다"},    // 통신/뉴미디어
      {id: 4, name: "웨이브 '코코와+', 생성형 AI 품고 美 입지 강화"},    // IT 일반
      {id: 5, name: "QLED TV 탄생시킨 양자점…태양전지·의료 활용분야 무궁무진"},    // 보안/해킹
      {id: 6, name: "넥스트이지, 전력거래소 발전량 예측시스템 시험 통과"},    // 컴퓨터
      {id: 7, name: "하이크 퍼블리싱 ‘블랙 위치크래프트’, 5일 닌텐도 스위치 버전 출시"},    // 게임/리뷰
    ]
    setItems(dummyData.map((item: {name: string}) => item.name))
  }, [])

  const [items, setItems] = useState<string[]>([])
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [itemStates, setItemStates] = useState<boolean[]>(new Array(items.length).fill(false))

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
        alert('회원가입을 완료하였습니다')
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
      alert('관심기술스택을 선택해주세요.')
      navigate('/signup/2')
    } else if ( formData.job === 0) {
      alert('관심직무를 선택해주세요.')
      navigate('/signup/22')
    }
  }, [formData])

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