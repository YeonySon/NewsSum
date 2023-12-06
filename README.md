# ![newsum](https://github.com/YeonySon/NewsSum/assets/116241870/0f886b6b-7e10-4575-b0d0-03e621515a4c) (SSAFY 빅데이터 추천 프로젝트)
![newsum2](https://github.com/YeonySon/NewsSum/assets/116241870/c5787c48-5608-4642-93c6-88c6257be3d7)
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
| ![뉴스숏츠](https://github.com/YeonySon/NewsSum/assets/116241870/2a4ed70a-8fc9-45b5-a17b-f1a40b836776)|![뉴스숏츠2](https://github.com/YeonySon/NewsSum/assets/116241870/d486f885-7ea8-4900-acdb-c51f055e0424) |

**⭐참고**
- KPF-BERTSum
- 한국언론진흥재단에서 구축한뉴스기사 요약에 특화된 모델    

### 2. 분야별 뉴스 리스트
2-1. IT 뉴스 분야별로 분류하여 원하는 카테고리를 기준으로 개인 맞춤형 추천 기사를 볼 수 있다.
|웹 | 모바일 |
|:------:|:------:|
|![뉴스보기](https://github.com/YeonySon/NewsSum/assets/116241870/fee3a431-faaa-4f6e-9279-e417090f6c3c)|![뉴스보기2](https://github.com/YeonySon/NewsSum/assets/116241870/aecfce2c-3d72-4097-8e48-41966caa78f0) |
    
### 3. 뉴스 키워드 분석 및 통계
3-1. 개인 읽은 뉴스를 기준으로 워드 클라우드 및 각종 통계를 그래프로 표현
|웹|모바일|
|:------:|:------:|
|![분석](https://github.com/YeonySon/NewsSum/assets/116241870/28975170-a012-47a9-b265-c76eb0ba61db)|![분석2](https://github.com/YeonySon/NewsSum/assets/116241870/bc698113-1866-42c0-9bb7-d581330e93e5)|

**⭐참고**
- doc2vec , bm-25 방식의 추천 알고리즘 사용
- 기사 추천을 위해 konlpy의 okt 형태소 분석기를 이용한 명사 추출

|추천 알고리즘|명사 추출|
|:------:|:------:|
|![알고리즘](https://github.com/YeonySon/NewsSum/assets/116241870/9fd09945-ffe4-4aac-8809-c4851d656c7b)|![명사추출](https://github.com/YeonySon/NewsSum/assets/116241870/873be9f1-10e7-48b1-bbdb-4cca8782cfb9)|
    

### 4. 스크랩
**4-1. 개인이 원하는 기사는 스크랩 기능을 통해 따로 모아 필요 시 다시 확인 가능**
![스크랩](https://github.com/YeonySon/NewsSum/assets/116241870/07d7f195-d310-4bc1-ae69-1fe4d6d27400)

## 💫 아키텍처
![newsum_아키텍처](https://github.com/YeonySon/NewsSum/assets/116241870/5b11c608-0d05-41a8-a630-44883998f16b)

## 🎨 ERD
![newsumErd](https://github.com/YeonySon/NewsSum/assets/116241870/5c91123a-212c-4792-a367-3e11c743ec97)

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
|![손승연](https://github.com/YeonySon/NewsSum/assets/116241870/c422a221-8825-4765-b8d8-57231ee7bbb2)|![김승용](https://github.com/YeonySon/NewsSum/assets/116241870/a105e578-8c36-4105-b7f2-2bfe92f6b869)|![김지희](https://github.com/YeonySon/NewsSum/assets/116241870/f0e1c434-eb9c-431e-827c-65eb867e1b8a)|![김준석](https://github.com/YeonySon/NewsSum/assets/116241870/9d86dcf1-645a-43be-ac95-e8e28d04f355)|![손정민](https://github.com/YeonySon/NewsSum/assets/116241870/0039a005-0d82-4674-9d91-2e4056226a31)|
|:------:|:------:|:------:|:------:|:------:|
| **손승연** | **김승용** | **김지희** | **김준석** | **손정민** |
| Back-End | AWS & Back-End & Recommend | Back-End | Front-End | Front-End |
| zzangookd@gmail.com | gkstjeo17@naver.com | jihee9945@gmail.com | pepaa15@naver.com | jungmin0049@gmail.com |
