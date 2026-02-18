# 0. 안내

본 프로젝트 <b>Board Maker</b>는 포트폴리오 용도로 작성되었습니다.
<br><br>각 해당 항목은, 본 페이지에서 찾아볼 수 있지만, 파일이 너무 큰 경우, 일부만 올려져 있습니다. 전체 파일은 <b>개발문서 폴더(document)</b>에서 찾아볼 수 있습니다.

<ol>
<li>기획</li>
<li>요건 정의</li>
<li>Use Case Diagram</li>
<li>페이지 기능&분류도</li>
<b><li>화면 설계서</li></b>
<b><li>데이터베이스 설계(ERD)</li></b>
<li>기술 선정</li>
<b><li>제조(중단)</li></b>
</ol>

# 1. 요건정의

<p align="center"><img width="745" src="https://user-images.githubusercontent.com/113015792/229287990-5363a4ab-d182-45c6-8fbd-dcd61d84b2c5.png"></p>
<div align="center"><ul><li>해당 이미지는 일부입니다. 전체 파일은 document 폴더를 참조하세요.</li></ul></div>

# 3. Use Case Diagram

<p align="center"><img width="65%" height="65%" src="https://user-images.githubusercontent.com/113015792/229288479-c8a222c9-699c-4272-8bb7-9c3fe37fc866.png"></p>

# 3. 페이지 기능&분류도

<p align="center"><img width="944" src="https://user-images.githubusercontent.com/113015792/229290915-a17864fe-9a75-4fce-9c38-6b8c9e7830a1.png">
</p>
<div align="center"><ul><li>해당 이미지는 일부입니다. 전체 파일은 document 폴더를 참조하세요.</li></ul></div>

# 4. 화면설계서

<p align="center"><img width="1037" src="https://user-images.githubusercontent.com/113015792/229291060-408b9228-3ace-44b8-a492-fef800460892.png"></p>
<div align="center"><ul><li>해당 이미지는 일부입니다. 전체 파일은 document 폴더를 참조하세요.</li></ul></div>

# 5. 데이터베이스 설계(ERD)

<p align="center"><img width="80%" height="80%" src="https://user-images.githubusercontent.com/113015792/229289377-628f8124-2b93-4cbc-8ceb-64ef72849f83.png"></p>
<div align="center"><ul><li>ERD 상세 확인은 DDL을 참조하세요.</li></ul></div>

# 6. 기술 선정

<p align="center"><img src="https://user-images.githubusercontent.com/113015792/229289551-25d29e5c-e06a-4dfd-9340-95ff58b8a7d8.png"></p>
<ul>
<li>Front-end는 React.js를 사용합니다. React는 코드 수정 시, Hot Module Replacement를 통해 개발 모드에서 화면에 즉시 반영되는 효과가 있습니다. 또한, JavaScript 특성상, 많은 데이터를 JSON 형태로 처리 및 적용할 수 있으므로 편리합니다. 여기에 상태 관리 라이브러리인 Redux를 적용하여 데이터를 중앙집권화시켜, 복잡해질 수 있는 데이터 관리를 간단하게 추적할 수 있습니다. 추가로 프론트 컴포넌트 전용 라이브러리 MUI를 사용하여, 필요한 기능의 컴포넌트를 검색 및 적용시킬 수 있습니다.</li>
<br><li>Back-end는 Node.js와 Sequelize를 사용합니다. Sequelize는 Node.js 기반의 ORM으로, MVC 구조 형태로 서버를 구성할 수 있습니다. 데이터베이스 연결 후 Sequelize ORM 문법을 사용해 바인딩 형태로 CRUD를 적용하여, 보안에 우수한 특징을 가집니다. 내부 model에서 데이터베이스 구조를 생성하므로, 따로 DDL 파일이 필요하지 않고, model 자체가 설계서가 되는 장점이 있습니다. REST 요청 시, 프로미스 객체를 반환하므로 비동기 처리에 우수합니다.</li>
<br><li>Front와 Back, 모두 JavaScript 기반이며, 따라서 JavaScript 하나로 풀스택 개발이 가능하며, 데이터 통신 규약도 같은 JSON 형식을 사용하므로, 특별히 변환 처리를 할 필요가 없는 것이 장점입니다.</li>
<br><li>개발 서버 환경은 Node.js와 Express를 사용하며, 데이터베이스로는 MySQL을 사용합니다. MySQL은 소규모 서비스를 가정할 경우에도 문제 없이 데이터를 처리할 수 있는 것으로 알려져 있습니다. 이때, Apache를 프록시 서버로 사용하여 Express에 접속합니다. 이렇게 함으로써, Apache가 CORS 문제를 미리 필터링하고 처리하므로, Express에서 따로 CORS 보안 코드를 작성할 필요가 없습니다. 이 구성을 통해 개발 환경이 더 안전하게 유지되며, 웹 서버와 데이터베이스 간의 일관성이 보장됩니다.</li></ul>

# 7. 제조

Front-end와 Back-end 제조는 중단 상태입니다.

<ul>
<li>백엔드 환경설정</li>
<li>회원가입 관련 API 작성</li>
<li>프론트엔드 환경설정, 회원가입 탭 페이지 목업 작성</li>
<li>가입 요청 성공, 정상 DB 주입 완료.</li>
<li>메일 인증 성공, 정상 DB 변경 완료.</li>
<li>암호 찾기 프로세스 성공, 정상 DB 변경 완료.</li>
<li>회원 가입 관련 페이지(& 모바일) 작성 완료. </li>
</ul>
