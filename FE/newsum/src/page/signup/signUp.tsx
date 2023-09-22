// import React, { useState } from 'react';

// import FirstPage from '../../components/signup/firstPage';
// import SecondPage from '../../components/signup/secondPage';
// import FinalPage from '../../components/signup/finalPage';

// interface FormData {
//   id: string;         // email
//   password: string;   // 비밀번호
//   name: string;       // 이름
//   birthdate: string;  // 생년월일, YYYYMMDD
//   tech: number[];     // 관심기술
//   headline: number[]; // 헤드라인
// }

// function SignUp() {
  
//   const initialFormData: FormData = {
//     id: '',
//     password: '',
//     name: '',
//     birthdate: '',
//     tech: [],
//     headline: []
//   }

//   const [currentPage, setCurrentPage] = useState(1);
//   const [formData, setFormData] = useState(initialFormData)

//   const handlePage = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       {currentPage === 1 && (
//         <FirstPage onNext={handlePage} />
//       )}

//       {currentPage === 2 && (
//         <SecondPage />
//       )}

//       {currentPage === 3 && (
//         <FinalPage />
//       )}
//     </>
//   )
// }

// export default SignUp;