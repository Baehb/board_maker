// member_table(member.js)
const member_table = {
  // 가입 구분치
  mbr_state: {
    PENDING: 0,
    JOINED: 1,
    WITHDRAWN: 2,
  },
  // 멤버 등급
  mbr_grade: {
    USER: {
      KRN: '유저',
      LEVEL: 7,
    },
    STAFF: {
      KRN: '스탭',
      LEVEL: 3,
    },
    ADMIN: {
      KRN: '어드민',
      LEVEL: 1,
    },
  },

  // 인증번호 길이
  MBR_CERT_NUM: 8,

  // 스케쥴러 호출 시간 = 10초
  CALL_SCHEDULER_TIME: 10,
  // 스케쥴러 유지 시간 = 10분
  CONT_SCHEDULER_TIME: 600000,
}

// settings_table(settings.js)
const settings_table = {
  // 메인표시글수치
  MAIN_DISPLAY_NUM: 10,
  // 최초표시댓글수
  POST_REPLY_NUM: 10,
  // 추가표시댓글수
  POST_ADD_REPLY_NUM: 5,
  // 가입기본점수
  SIGN_UP_SCORE: 10,
  // PK용알파벳
  CONSTANT_PK: 'R',
}

// emailController.js
const mail = {
  // 메일 제목
  subject: 'board_maker 인증번호가 도착하였습니다.',
  // 메일 형식
  mailform(certNum) {
    return `
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table
              width="300"
              height="200"
              cellspacing="0"
              cellpadding="0"
              style="
                border-radius: 15px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
                background-color: #f5f5f5;
              "
            >
              <tr>
                <td valign="middle">
                  <p
                    style="
                      font-size: 32px;
                      font-weight: bold;
                      color: #4a4a4a;
                      text-align: center;
                      margin: 0;
                    "
                  >
                    ${certNum}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div><br>위 인증번호를, 인증번호란에 입력하십시오.</div>`
  },
}

module.exports = {
  member_table,
  settings_table,
  mail,
}
