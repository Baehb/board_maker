const db = require('../models')
const { member_table, settings_table } = require('../config/constants.js')
const RM = require('../config/responseMessages.js')
const { delivery } = require('./emailController.js')
const { v4 } = require('uuid')
const date = new Date()

const Member = db.member

// 1. 회원가입(구분치 설정 : 대기)
const addMember = ({ body: b } = req, res) => {
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

  //row 생성
  Member.create(info)
    //메일 발송
    .then(() => {
      delivery(info.mbr_email, info.mbr_cert_number)
    })
    //성공 응답
    .then(() => {
      console.log(RM['25'])
      res.status(200).send({ message: RM['025'] })
    })
    .catch(error => {
      // 해당 중복 항목 메시지 전송
      res.status(500).send({ message: duplicateEntryCheck(error) })
    })

  // 자동 삭제 스케쥴러
  // 10분 뒤, 메일 인증번호가 전송되지 않았을 경우, 회원정보 전체 삭제 요청을 날린다.
}

// 2. 코드 인증시, 회원가입(구분치 변경 : 대기 -> 가입), 인증번호 삭제

// 3. 회원정보 일부 수정(인증번호 삭제)

// 3. 회원정보 1~다수 등록
// 3. 회원정보 1~다수 삭제

// 4. 회원 탈퇴(구분치 변경 : 가입 => 탈퇴 )

// 関数. 중복 검사
const duplicateEntryCheck = err => {
  // err != {}
  if (Object.keys(err).length !== 0) {
    let error_key = Object.keys(err.fields)[0] || 'default'

    const message = {
      mbr_id: RM['022'],
      mbr_nickname: RM['023'],
      mbr_email: RM['024'],
      default: RM['099'],
    }
    return message[error_key]
  }
  return RM['098']
}

module.exports = {
  addMember,
}
