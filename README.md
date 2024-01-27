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

# 1. 기획

게시판 짜기는 정말 여러 기술을 배우고 적용할 수 있는 좋은 프로젝트라는 말이 있습니다. 게시판 구조를 표방하며 많은 기술을 시도해볼 수 있는 프로젝트는 인터넷 커뮤니티라고 생각합니다.

인터넷 커뮤니티 게시판이란, 단순히 관리자 홀로 공지하는 홈페이지가 아닌, 여러 사람이 모여 다양한 의견을 나눌 수 있는 교류의 장입니다. 사람이 많이 모일 수 있게 하려면, 우선 여러 가지 사항을 제공해야 합니다.

1. <b>주제가 필요합니다.</b> 그러나 한 가지 주제만으로는 많은 접속자를 모으지 못하는 경우가 있습니다. 여기서는 카테고리를 추가하여, 게시판을 분리할 필요가 있겠습니다. 운영자는 원하는 만큼 카테고리를 생성하고, 유저는 원하는 카테고리에 글을 쓸 수 있습니다. 그 중 엄선된 게시물들이 추천 카테고리에 올라가는 형태가 일반적이고 유용합니다.

2. <b>편의 사항이 필요합니다.</b> 이용자는 내 작성한 글에 대한 반응을 볼 수 있어야 합니다. 또한, 내 글에 반응이 있다는 사실을 아는 것도 중요합니다. 만약 내 글에 반응이 없는데 그대로 글을 맨 위로 끌어 올릴 수 있다면, 다시 한번 반응을 기대할 수 있을 것입니다. <ul><li>UI/UX는 직관적이어야 합니다. 여기서 저는 로그인할 때 아이디를 입력하지 않으면 ‘아이디를 입력하세요!’와 같은 경고창이 새롭게 뜨는 것보다는, 아예 로그인 버튼이 잠겨버리는 UI를 선호합니다.</li></ul>

3. <b>관리가 필요합니다.</b> 주제에 맞지 않는 게시물들은 사람들을 떠나게 합니다. 운영자를 중심으로 도울 사람들이 필요합니다. 삭제 및 벌점 제도를 운용할 수 있습니다. 하지만 권한의 남용을 막기 위하여, 벌점을 준 게 누구인지 추적을 할 수 있게 해야 합니다. 하지만 이는 운영진에게만 해당하는 게 아닙니다. 모든 게시물은 삭제한다고 바로 삭제되지 않고 단지 보이지 않을 뿐입니다. 이러한 점을 이용하여, 운영자는 무분별한 혼란을 어느 정도 막을 수 있습니다.

이를 위하여 맞춤 설계와 여러 가지 기술들을 적용해볼 수 있을 것입니다.

# 2. 요건정의

<p align="center"><img width="745" src="https://user-images.githubusercontent.com/113015792/229287990-5363a4ab-d182-45c6-8fbd-dcd61d84b2c5.png"></p>
<div align="center"><ul><li>해당 이미지는 일부입니다. 전체 파일은 document 폴더를 참조하세요.</li></ul></div>

# 3. Use Case Diagram

<p align="center"><img width="65%" height="65%" src="https://user-images.githubusercontent.com/113015792/229288479-c8a222c9-699c-4272-8bb7-9c3fe37fc866.png"></p>

# 4. 페이지 기능&분류도

<p align="center"><img width="944" src="https://user-images.githubusercontent.com/113015792/229290915-a17864fe-9a75-4fce-9c38-6b8c9e7830a1.png">
</p>
<div align="center"><ul><li>해당 이미지는 일부입니다. 전체 파일은 document 폴더를 참조하세요.</li></ul></div>

# 5. 화면설계서

<p align="center"><img width="1037" src="https://user-images.githubusercontent.com/113015792/229291060-408b9228-3ace-44b8-a492-fef800460892.png"></p>
<div align="center"><ul><li>해당 이미지는 일부입니다. 전체 파일은 document 폴더를 참조하세요.</li></ul></div>

# 6. 데이터베이스 설계(ERD)

<p align="center"><img width="80%" height="80%" src="https://user-images.githubusercontent.com/113015792/229289377-628f8124-2b93-4cbc-8ceb-64ef72849f83.png"></p>
<div align="center"><ul><li>ERD 상세 확인은 DDL을 참조하세요.</li></ul></div>

# 7. 기술 선정

<p align="center"><img src="https://user-images.githubusercontent.com/113015792/229289551-25d29e5c-e06a-4dfd-9340-95ff58b8a7d8.png"></p>
<ul>
<li>Front-end는 React.js를 사용합니다. React는 코드 수정 시, Hot Module Replacement를 통해 개발 모드에서 화면에 즉시 반영되는 효과가 있습니다. 또한, JavaScript 특성상, 많은 데이터를 JSON 형태로 처리 및 적용할 수 있으므로 편리합니다. 여기에 상태 관리 라이브러리인 Redux를 적용하여 데이터를 중앙집권화시켜, 복잡해질 수 있는 데이터 관리를 간단하게 추적할 수 있습니다. 추가로 프론트 컴포넌트 전용 라이브러리 MUI를 사용하여, 필요한 기능의 컴포넌트를 검색 및 적용시킬 수 있습니다.</li>
<br><li>Back-end는 Node.js와 Sequelize를 사용합니다. Sequelize는 Node.js 기반의 ORM으로, MVC 구조 형태로 서버를 구성할 수 있습니다. 데이터베이스 연결 후 Sequelize ORM 문법을 사용해 바인딩 형태로 CRUD를 적용하여, 보안에 우수한 특징을 가집니다. 내부 model에서 데이터베이스 구조를 생성하므로, 따로 DDL 파일이 필요하지 않고, model 자체가 설계서가 되는 장점이 있습니다. REST 요청 시, 프로미스 객체를 반환하므로 비동기 처리에 우수합니다.</li>
<br><li>Front와 Back, 모두 JavaScript 기반이며, 따라서 JavaScript 하나로 풀스택 개발이 가능하며, 데이터 통신 규약도 같은 JSON 형식을 사용하므로, 특별히 변환 처리를 할 필요가 없는 것이 장점입니다.</li>
<br><li>개발 서버 환경은 Node.js와 Express를 사용하며, 데이터베이스로는 MySQL을 사용합니다. MySQL은 소규모 서비스를 가정할 경우에도 문제 없이 데이터를 처리할 수 있는 것으로 알려져 있습니다. 이때, Apache를 프록시 서버로 사용하여 Express에 접속합니다. 이렇게 함으로써, Apache가 CORS 문제를 미리 필터링하고 처리하므로, Express에서 따로 CORS 보안 코드를 작성할 필요가 없습니다. 이 구성을 통해 개발 환경이 더 안전하게 유지되며, 웹 서버와 데이터베이스 간의 일관성이 보장됩니다.</li></ul>

# 8. 제조

현재(240101), Front-end와 Back-end 제조는 중단되었습니다.

<ul>
<li>백엔드 환경설정</li>
<li>회원가입 관련 API 작성</li>
<li>프론트엔드 환경설정, 회원가입 탭 페이지 목업 작성</li>
<li>가입 요청 성공, 정상 DB 주입 완료.</li>
<li>메일 인증 성공, 정상 DB 변경 완료.</li>
<li>암호 찾기 프로세스 성공, 정상 DB 변경 완료.</li>
<li>회원 가입 관련 페이지(& 모바일) 작성 완료. </li>
</ul>

# 번외. 개발 중 화면

<p align="center">
<img width="600" src="https://user-images.githubusercontent.com/113015792/230740896-45c6083d-d59c-4326-80a8-e7ac63f5f45f.png">
<img width="340" src="https://user-images.githubusercontent.com/113015792/230740903-0bb97cd6-77bc-48c4-8e1d-1360a2b420f6.png">
<img width="600" src="https://user-images.githubusercontent.com/113015792/230980345-93b15e64-7a81-4e92-8da1-9886e5531d01.png">
<img width="340" src="https://user-images.githubusercontent.com/113015792/230980409-86c002df-22bb-4720-8a15-c6c3d4e85522.png">
<img width="600" src="https://user-images.githubusercontent.com/113015792/232554809-88aefd85-1540-4bea-9517-4bd257f6e71e.png">
</p>

