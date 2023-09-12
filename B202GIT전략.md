# Git

## Branch

1. master 브랜치
- 제품으로 출시될 수 있는 브랜치, 기준이되는 브랜치

1. develop 브랜치
- 다음 출시 버전을 개발하는 브랜치, 일반적으로 merge 대상(default) 브랜치로 사용

1. feature 브랜치
- 각 작업(기능)을 개발하는 브랜치

### Branch명 작성

1. master 브랜치
- 그대로 사용

1. develop 브랜치
- 그대로 사용

1. feature 브랜치
- 기능에 따라 브랜치명을 작성한다
- ex) feature/fe-login
- ex) feature/be-login

- 브랜치 생성
    
    → git checkout -b “feature/be-login”
    

## Commit 작성

- feat : 새로운 기능 commit 시
- fix : 버그 수정 관련 commit 시
- style : 코드 스타일 혹은 포맷 commit 시
- chore : 기타 수정 commit 시
- build : 빌드 관련 commit 시
- docs : 문서 수정 commit 시
- refactor : 코드 리팩토링commit 시
- test : 테스트 코드 수정 commit 시
- ci : ci 관련 설정 수정 commit 시

→ ex) feat: Fe 회원가입 페이지 생성 [이슈ID]

## MR 요청

템플릿을 활용, Assignee, Reviewer, Labels 설정

```markdown
- 제목 : feat: 기능
  ex) feat: login 페이지 기능 구현
  (확인 후 지워주세요)

## 📒 어떤 이유로 MR를 하셨나요?
- [ ] feature 병합(feature issue #를 남겨주세요)
- [ ] 버그 수정(아래에 issue #를 남겨주세요)
- [ ] 코드 개선
- [ ] 기타(아래에 자세한 내용 기입해주세요)

## 🧿Part
   ex) 체크를 하려면 [ ] 안에 x 넣기

- [ ] FE 

- [ ] BE

- [ ] Other

  <br/>

## 📄 작업 내용

- 기능에서 어떤 부분이

- 구현되었는지 설명해주세요

- 리뷰가 필요한 부분은 알려주세요

  <br/>

## 📷이미지 첨부

<img src="파일주소" width="30%" height="30%"/>

<br/>

## 📦 앞으로의 과제

- 다음 본인이 맡은 할 일을

- 적어주세요

  <br/>
```

## Pn 규칙

코드 리뷰의 코멘트에 코멘트를 강조하고 싶은 정도를 표기하기

리뷰어는 코드 리뷰의 코멘트에 Pn 규칙에 맞추서 표기하기

- P1: 꼭 반영해 주세요 (Request changes)
- P2: 적극적으로 고려해 주세요 (Request changes)
- P3: 웬만하면 반영해 주세요 (Comment)
- P4: 반영해도 좋고 넘어가도 좋습니다 (Approve)
- P5: 그냥 사소한 의견입니다 (Approve)

## D-n 규칙

코드 리뷰가 완료되어야 하는 시점을 D-N 형식의 라벨로 나타냄

예를들어 D-3은 3일 이내에 코드 리뷰가 확인되어야 하는 의미

![D-n](/D-n.png)
