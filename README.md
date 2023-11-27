## 🆕 프로젝트 이름 : NewSum

---

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/d413b1d2-6eac-4a68-b116-b3bf75f72622/Untitled.png)

## 🔖 프로젝트 개요


---

**NewSum**은 뉴스 추천 웹 애플리케이션입니다. 

네이버 IT 뉴스를 총 8개의 분야(모바일, 인터넷/SNS, 통신/뉴미디어, IT 일반, 보안/해킹, 컴퓨터, 게임/리뷰, 과학 일반)로 구분하여 뉴스 리스트를 보여줍니다.

저희 서비스는 뉴스 본문을 3줄로 요약하여 사용자가 언제, 어디서나 손쉽게 뉴스를 볼 수 있는 기능을 제공합니다.

또한, 개인 맞춤형 추천, 스크랩 기능을 제공하여 관심 있는 뉴스 위주로 볼 수 있습니다.

## 🧑‍🤝‍🧑 팀원 소개

---

| Name | Role | Detail |
| --- | --- | --- |
| 손승연 | 팀장 & Backend | API 개발 + 추천 알고리즘 |
| 김지희 | Backend | API 개발 + spring security |
| 김승용 | Backend | 인프라 + 추천 알고리즘 |
| 김준석 | Frontend |  |
| 손정민 | Frontend |  |

## 기술 스택

---

| TECH | STACK |
| --- | --- |
| Language | Java, TypeScript |
| Back-End | Spring Boot, JPA, Spring Security, JWT |
| Front-End | Reatc, Recoil |
| Database | MySQL |
| Server | AWS EC2, NginX |
| DevOps | Git, Docker |

<details>
<summary>💻 Back-End 기술 자세히 보기</summary>
<div markdown="1">





    ```java
    plugins {
        id 'java'
        id 'org.springframework.boot' version '2.7.15'
        id 'io.spring.dependency-management' version '1.0.15.RELEASE'
    }
    
    group = 'com.ssafy'
    version = '0.0.1-SNAPSHOT'
    
    java {
        sourceCompatibility = '11'
    }
    
    configurations {
        compileOnly {
            extendsFrom annotationProcessor
        }
    }
    
    repositories {
        mavenCentral()
    }
    
    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
        implementation 'org.springframework.boot:spring-boot-starter-security'
        implementation 'org.springframework.boot:spring-boot-starter-validation'
        implementation 'org.springframework.boot:spring-boot-starter-web'
        implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.3.1'
    
        //json parser
        implementation group: 'com.googlecode.json-simple', name: 'json-simple', version: '1.1.1'
    
        //jwt
        implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
        implementation 'io.jsonwebtoken:jjwt-jackson:0.11.2'
        runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
        implementation 'com.auth0:java-jwt:4.2.1'
    
        //SMTP
        implementation 'org.springframework.boot:spring-boot-starter-mail'
    
        //Jython
        //https://mvnrepository.com/artifact/org.python/jython
    //    implementation group: 'org.python', name: 'jython', version: '2.7.3'
    
        compileOnly 'org.projectlombok:lombok'
        developmentOnly 'org.springframework.boot:spring-boot-devtools'
        runtimeOnly 'com.mysql:mysql-connector-j'
        annotationProcessor 'org.projectlombok:lombok'
        testImplementation 'org.springframework.boot:spring-boot-starter-test'
        testImplementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter-test:2.3.1'
        testImplementation 'org.springframework.security:spring-security-test'
    }
    
    tasks.named('test') {
        useJUnitPlatform()
    }
    ```
</div>
</details>    


<details>
<summary>🎨 Front-End 기술 자세히 보기</summary>
<div markdown="1">


  

    ```jsx
    - 패키지 매니저: `node:16.14.0`
    - CSS 라이브러리: **`styled-components`**
    - 종속성 라이브러리 목록:
        - **`@testing-library/jest-dom`**: 버전 5.17.0
        - **`@testing-library/react`**: 버전 13.4.0
        - **`@testing-library/user-event`**: 버전 13.5.0
        - **`@types/react`**: 버전 18.2.21
        - **`@types/react-dom`**: 버전 18.2.7
        - **`@types/react-router-dom`**: 버전 5.3.3
        - **`axios`**: 버전 1.5.0
        - **`chart.js`**: 버전 4.4.0
        - **`react`**: 버전 18.2.0
        - **`react-chartjs-2`**: 버전 5.2.0
        - **`react-cookie`**: 버전 6.1.1
        - **`react-cookies`**: 버전 0.1.1
        - **`react-dom`**: 버전 18.2.0
        - **`react-icons`**: 버전 4.11.0
        - **`react-router-dom`**: 버전 6.15.0
        - **`react-scripts`**: 버전 5.0.1
        - **`react-wordcloud`**: 버전 1.2.7
        - **`recoil`**: 버전 0.7.7
        - **`recoil-persist`**: 버전 5.1.0
        - **`styled-components`**: 버전 6.0.8
        - **`typescript`**: 버전 4.9.5
        - **`v6`**: 버전 0.0.0
        - **`web-vitals`**: 버전 2.1.4
    ```
  </div>
</details>    

## 주요 기능

---

### 1. 뉴스 3줄 요약

- KPF-BERTSum
- 한국언론진흥재단에서 구축한뉴스기사 요약에 특화된 모델
    - 웹
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/83231077-f943-48c4-94c0-5d6f58450ab7/Untitled.png)
    
    - 모바일
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/bd015463-3867-416d-b623-3555db5e1218/Untitled.png)
    

### 2. 분야별 뉴스 리스트

- IT 뉴스 분야별로 분류하여 원하는 카테고리를 기준으로 개인 맞춤형 추천 기사를 볼 수 있다.
    - 웹
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/32b6cd77-c23b-4a6d-825b-61b3d6cfb9a6/Untitled.png)
    
    - 모바일
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/9085b23d-8135-4d35-85d0-9293ead8e14a/Untitled.png)
    

### 3. 뉴스 키워드 분석 및 통계

- doc2vec , bm-25 방식의 추천 알고리즘 사용

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/cc5f6a13-0f9e-4d66-8e57-d10a27aae590/Untitled.png)

- 기사 추천을 위해 konlpy의 okt 형태소 분석기를 이용한 명사 추출

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/54530f3b-3b84-408c-ae6b-be77b1ee5658/Untitled.png)

- 개인 읽은 뉴스를 기준으로 워드 클라우드 및 각종 통계를 그래프로 표현
    - 웹
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/d192ffb6-6e27-482d-a3f7-e015ecf4e006/Untitled.png)
    
    - 모바일
        
        ![test11-removebg-preview (5).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/7ad44c85-cd03-48fd-ab79-ce21c243e26e/test11-removebg-preview_(5).png)
        
    

### 4. 스크랩

- 개인이 원하는 기사는 스크랩 기능을 통해 따로 모아 필요 시 다시 확인 가능

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/d5935bdc-a4e8-4ed9-b668-9fec97ac25ef/Untitled.png)

## ✍️ 아키텍처

---

![newsumStack.drawio.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/cea9d606-624d-44ea-bfe2-2abb174dca3f/newsumStack.drawio.png)

## 💾 ERD

---

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/05a5db0b-f9b2-4d36-a056-8dad16dc6279/Untitled.png)

## 와이어 프레임

---

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/23625b80-0ade-47d5-b4f5-10172b4c8904/64101bc3-15a1-440c-87b2-15ffcd11a402/Untitled.png)

## 빌드 환경

---

| FrontEnd | BackEnd | Recommand System | Database | Infra |
| --- | --- | --- | --- | --- |
| React | Spring Boot 2.7.15 | scikit-learn | mysqlDB | AWS EC2 (Ubuntu 20.04 LTS) |
| TypeScript | JPA | konlpy | Redis | Nginx |
| node:16.14.0 | Mail | gensim |  | Jenkins |
|  | Lombok |  |  | Docker |
|  | JWT |  |  | Docker-Compose |

## 포팅 메뉴얼

---

https://www.notion.so/6d1788d22daa4690baa8452f2d41d977
