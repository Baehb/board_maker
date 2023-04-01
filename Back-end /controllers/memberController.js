const db = require('../models')
const { member_table, settings_table } = require('../config/constants.js')
const { v4 } = require('uuid')
const RM = require('../config/responseMessages.js')
const date = new Date()

const Member = db.member

// 1. 회원가입(구분치 설정 : 대기)
const addMember = async ({ body: b } = req, res) => {
  try {
    let info = {
      // 실제 입력값
      mbr_id: b.mbr_id,
      mbr_pw: b.mbr_pw,
      mbr_nickname: b.mbr_nickname,
      mbr_email: b.mbr_email,

      // 상수 주입
      mbr_state: member_table.mbr_state.PENDING,
      mbr_grade: member_table.mbr_grade.USER.LEVEL,
      mbr_score: settings_table.SIGN_UP_SCORE,

      // 생성값 주입
      mbr_code: v4(),
      mbr_signup_date: date,

      // 인증번호 주입
      mbr_cert_number: v4().substring(0, 8),
    }

    await Member.create(info)
    console.log(RM[25])
    res.status(200).send({ message: RM['025'] })

    // 메일 전송

    // 중복 발생
  } catch (error) {
    // 해당 중복 항목 메시지 전송
    res.status(500).send({ message: duplicateEntryCheck(error) })
  }
}

// 2. 회원가입(구분치 변경 : 대기 -> 가입), 인증번호 삭제

// 3. 회원정보 일부 수정
// 4. 회원 탈퇴(구분치 변경 : 가입 => 탈퇴 )

// 関数. 중복 검사
const duplicateEntryCheck = err => {
  let error_key = Object.keys(err.fields)[0]

  const message = {
    mbr_id: RM['022'],
    mbr_nickname: RM['023'],
    mbr_email: RM['024'],
    mbr_others: RM['099'],
  }

  return message[error_key] || message[mbr_others]
}

module.exports = {
  addMember,
}
