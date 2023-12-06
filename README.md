# ![newsum](https://github.com/newsum-team/newsum/assets/84459785/6bf4d959-fdd7-43c7-81c8-4c946bbaca69) (SSAFY 빅데이터 추천 프로젝트)
![newsum2](https://github.com/newsum-team/newsum/assets/84459785/485922ab-8414-45e7-8011-cc0c0ad0e7e1)
<br>

## ✅ 프로젝트 진행 기간

### 23.08.14 ~ 23.10.06 (6주)

## 📖 프로젝트 개요
**⭐NewSum은 뉴스 추천 웹 애플리케이션⭐**
<br><br>
네이버 IT 뉴스를 총 8개의 분야(모바일, 인터넷/SNS, 통신/뉴미디어, IT 일반, 보안/해킹, 컴퓨터, 게임/리뷰, 과학 일반)로 구분하여 뉴스 리스트를 보여줍니다.
저희 서비스는 뉴스 본문을 3줄로 요약하여 사용자가 언제, 어디서나 손쉽게 뉴스를 볼 수 있는 기능을 제공합니다.
또한, 개인 맞춤형 추천, 스크랩 기능을 제공하여 관심 있는 뉴스 위주로 볼 수 있습니다.

## 🔖 프로젝트 목표
1. **뉴스를 요약해서 한 눈에 보이게 하자**
2. **개인 맞춤형 뉴스를 제공하자**

## ✍️ 기술 스택
<table>
<tr>
<td><b>Back-end</b></td>
<td>
<img src="https://img.shields.io/badge/Java-11-007396?style=flat&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring Boot-2.7.15-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/JPA-6DB23E?style=flat-square&logo=Hibernate&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/Spring Security-2.7.15-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON Web Tokens&logoColor=white"/>
</td>
</tr>

<tr>
<td><b>Front-end</b></td>
<td>
<img src="https://img.shields.io/badge/TypeScript-F7DF1E?style=flat-square&logo=typescript&logoColor=black"/>
<img src="https://img.shields.io/badge/React-18.2.21-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-3958FF?style=flat-square&logo=Recoil&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/Npm-CB3837?style=flat-square&logo=Npm&logoColor=white"/>
<img src="https://img.shields.io/badge/Node-16.14.0-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=c
ss3&logoColor=white"/>
</td>
</tr>

<tr>
<td><b>Infra</b></td>
<td>
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon aws&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-4479A1?style=flat-square&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=white"/>
<img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/>
</td>
</tr>

<tr>
<td><b>Tools</b></td>
<td>
<img src="https://img.shields.io/badge/Notion-333333?style=flat-square&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=white"/>
<img src="https://img.shields.io/badge/JIRA-0052CC?style=flat-square&logo=JIRA Software&logoColor=white"/>
</td>
</tr>
</table>

## 🖥️ 주요 기능

### 1. 뉴스 3줄 요약
1-1. 뉴스 본문 내용을 3줄로 요약
1-2. 드래그를 통해 다음 뉴스 shorts를 볼 수 있음
|웹|모바일|
|:------:|:------:|
| ![뉴스숏츠](https://github.com/newsum-team/newsum/assets/84459785/76c8ad06-8466-46ea-bfa4-a3ca5b69f872)|![뉴스숏츠2](https://github.com/newsum-team/newsum/assets/84459785/d94f4a70-23fc-49ed-b12f-409d641e3b3b) |

**⭐참고**
- KPF-BERTSum
- 한국언론진흥재단에서 구축한뉴스기사 요약에 특화된 모델    

### 2. 분야별 뉴스 리스트
2-1. IT 뉴스 분야별로 분류하여 원하는 카테고리를 기준으로 개인 맞춤형 추천 기사를 볼 수 있다.
|웹 | 모바일 |
|:------:|:------:|
|![뉴스보기](https://github.com/newsum-team/newsum/assets/84459785/0e2861f9-8ae3-4048-ad56-cff1c1a109e8)|![뉴스보기2](https://github.com/newsum-team/newsum/assets/84459785/0e7a73f9-28ee-4de7-ab61-a89ea17f22e7) |
    
### 3. 뉴스 키워드 분석 및 통계
3-1. 개인 읽은 뉴스를 기준으로 워드 클라우드 및 각종 통계를 그래프로 표현
|웹|모바일|
|:------:|:------:|
|![분석](https://github.com/newsum-team/newsum/assets/84459785/8f9982bc-a752-4479-bd0d-7f233eee1ab1)|![분석2](https://github.com/newsum-team/newsum/assets/84459785/731263cd-8c3b-40c2-910c-21fe09c35b65)|

**⭐참고**
- doc2vec , bm-25 방식의 추천 알고리즘 사용
- 기사 추천을 위해 konlpy의 okt 형태소 분석기를 이용한 명사 추출

|추천 알고리즘|명사 추출|
|:------:|:------:|
|![알고리즘](https://github.com/newsum-team/newsum/assets/84459785/f3cbb62d-e7f6-4744-9495-7d4dd8bcc4ae)|![명사추출](https://github.com/newsum-team/newsum/assets/84459785/55935300-dff8-4a69-89db-2f702f850bdf)|
    

### 4. 스크랩
**4-1. 개인이 원하는 기사는 스크랩 기능을 통해 따로 모아 필요 시 다시 확인 가능**
![스크랩](https://github.com/newsum-team/newsum/assets/84459785/c3a4e897-a72e-4d9a-beb7-bde84515e7c2)

## 💫 아키텍처
![newsum_아키텍처](https://github.com/newsum-team/newsum/assets/84459785/01f11e60-a992-4c4c-973c-b29e34d43b38)

## 🎨 ERD
![newsumErd](https://github.com/newsum-team/newsum/assets/84459785/bb90c7fb-616d-4968-9e76-fbdf6d9172b8)

## 📂 API 문서
[Notion API 문서](https://stirring-ceiling-175.notion.site/API-729be70b17344ce48a3d26dd56bbab5f?pvs=4)

## 📒 빌드 환경
<details>
<summary>Back-End 기술 자세히 보기</summary>
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
<summary>Front-End 기술 자세히 보기</summary>
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


## **😃 팀원 소개**
|![손승연](https://github.com/newsum-team/newsum/assets/84459785/53a3d84c-5cf1-4422-a5d2-74b7655c0cf8)|![김승용](https://github.com/newsum-team/newsum/assets/84459785/6e19c44b-0b48-414f-a12f-c8c58b9b0334)|![김지희](https://github.com/newsum-team/newsum/assets/84459785/42adf97d-fe6d-4eb6-a255-6907ff67b44c)|![김준석](https://github.com/newsum-team/newsum/assets/84459785/6402e470-016d-436c-a5a6-6630f45fa960)|![손정민](https://github.com/newsum-team/newsum/assets/84459785/0e5b31bc-989a-4537-a5f2-52aa5a60767a)|
|:------:|:------:|:------:|:------:|:------:|
| **손승연** | **김승용** | **김지희** | **김준석** | **손정민** |
| Back-End | AWS & Back-End & Recommend | Back-End | Front-End | Front-End |
| zzangookd@gmail.com | gkstjeo17@naver.com | jihee9945@gmail.com | pepaa15@naver.com | jungmin0049@gmail.com |
