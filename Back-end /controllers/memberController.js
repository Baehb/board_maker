const db = require('../models')
const { member_table, settings_table } = require('../config/constants.js')
const RM = require('../config/responseMessages.js')
const { delivery } = require('./emailController.js')
const { v4 } = require('uuid')
const schedule = require('node-schedule')

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
    mbr_signup_date: new Date(),

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
      // 컬럼 중복
      if (error.parent.code === 'ER_DUP_ENTRY') {
        res.status(500).send({ message: duplicateEntryCheck(error) })
      } else {
        res.status(500).send({ message: RM['099'] })
      }
    })

  // 스케쥴러 실행
  setScheduler(info)
}

// 회원인증 : 作成要

// 2. 회원정보 単数~複数 갱신
// 3. 회원정보 単数〜複数 삭제

// 関数. 중복(아이디, 닉네임, 이메일) 검사
const duplicateEntryCheck = err => {
  let error_key = Object.keys(err.fields)[0] || 'default'

  const message = {
    mbr_id: RM['022'],
    mbr_nickname: RM['023'],
    mbr_email: RM['024'],
    default: RM['099'],
  }
  return message[error_key]
}

// 関数. 스케쥴러 시행

// 스케쥴러 설정 함수
const setScheduler = info => {
  const { mbr_email, mbr_signup_date } = info

  // 임시 회원 객체
  const temp_member = {
    email: mbr_email,
    verified: false,
    start: false,
    lim: mbr_signup_date,
  }

  // 스케쥴러 생성
  const job = schedule.scheduleJob(
    `*/${member_table.CALL_SCHEDULER_TIME} * * * * *`,
    () => {
      const limit = new Date() - temp_member.lim

      // 시작 알림
      if (!temp_member.start) {
        temp_member.start = true
        console.log(RM['030'], temp_member.email)
      }

      // 인증됨
      if (temp_member.verified) {
        // 회원가입(구분치 설정 : 대기 => 가입) : 作成要
        job.cancel()
        endScheduler(temp_member.email)
        return
      }

      // 미인증 10분 초과
      if (limit >= member_table.CONT_SCHEDULER_TIME) {
        // 회원삭제(임시가입 => 정보삭제) : 作成要
        job.cancel()
        endScheduler(temp_member.email)
        return
      }

      console.log(limit, temp_member.email)
    }
  )

  // 임시 회원 스케쥴러 객체에 저장
  temp_member_scheduler[mbr_email] = {
    temp_member,
    job,
  }
}

// 스케쥴러 종료 함수
const endScheduler = mail => {
  // 객체가 이미 삭제되었는지 확인, 꼬임 방지.
  if (temp_member_scheduler[mail]) {
    temp_member_scheduler[mail].job.cancel()
    delete temp_member_scheduler[mail]
    console.log(RM['031'], mail)
  }
}

module.exports = {
  addMember,
}
