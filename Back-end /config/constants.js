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
}

module.exports = {
  member_table,
  settings_table,
}
