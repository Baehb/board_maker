const db = require('../models')
const { member_table, settings_table } = require('../config/constants.js')
const RM = require('../config/responseMessages.js')
const { delivery } = require('./emailController.js')
const { v4 } = require('uuid')
const date = new Date()

const Member = db.member
const temp_member_scheduler = {}

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
    mbr_cert_number: v4().substring(0, member_table.MBR_CERT_NUM),
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

  // 스케쥴러 실행
  schedulersetInterval(info)
}

// 회원인증 : 作成要

// 2. 회원정보 単数~複数 갱신
// 3. 회원정보 単数〜複数 삭제

// 関数. 중복(아이디, 닉네임, 이메일) 검사
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

// 関数. 스케쥴러 시행
const schedulersetInterval = info => {
  // 임시 회원 스케쥴러 객체
  temp_member_scheduler[info.mbr_email] = {
    // 임시 회원 객체
    temp_member: {
      email: info.mbr_email,
      verified: false,
      start: false,
    },
    schedule: null,
  }

  // 각종 변수 초기화
  let { email, verified, start } =
    temp_member_scheduler[info.mbr_email].temp_member

  // setInterval 스케쥴러
  temp_member_scheduler[info.mbr_email].schedule = setInterval(() => {
    // 시작 알림
    if (!start) {
      start = true
      console.log(RM['030'], email)
    }

    // 인증됨
    if (verified) {
      // 회원가입(구분치 설정 : 대기 => 가입) : 作成要
      endschedulerclearInterval(email)
    }

    // 미인증 10분 초과
    const limit = new Date() - info.mbr_signup_date
    if (limit >= member_table.CONT_SCHEDULER_TIME) {
      // 회원삭제(임시가입 => 정보삭제) : 作成要
      endschedulerclearInterval(email)
      delete temp_member_scheduler[email]
    }
  }, member_table.CALL_SCHEDULER_TIME)

  // 内部関数. 스케쥴러 종료
  const endschedulerclearInterval = mail => {
    clearInterval(temp_member_scheduler[info.mbr_email].schedule)
    temp_member_scheduler[info.mbr_email] = null

    console.log(RM['031'], mail)
  }
}

module.exports = {
  addMember,
}
