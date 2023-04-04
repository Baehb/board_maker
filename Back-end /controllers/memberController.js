const db = require('../models')
const Member = db.member
const {
  member_table,
  settings_table,
  regexSearch: R,
  mail,
} = require('../config/constants.js')
const RM = require('../config/responseMessages.js')
const { delivery } = require('./emailController.js')
const { v4 } = require('uuid')
const schedule = require('node-schedule')
const bcrypt = require('bcrypt')
const temp_member_scheduler = {}
let mail_count = {}

// ① 회원가입(임시)
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

  //유효성 검사
  const valMsg = regCheck(info)
  if (valMsg) {
    return res.status(400).send({ message: valMsg })
  }

  //row 생성
  Member.create({ ...info, mbr_pw: hashPassword(info.mbr_pw) })
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
      console.log(error)
      if (error.parent.code === 'ER_DUP_ENTRY') {
        res.status(500).send({ message: duplicateEntryCheck(error) })
      } else {
        res.status(500).send({ message: RM['099'] })
      }
    })

  // 스케쥴러 실행
  setScheduler(info)
}

// ② 회원가입(정식)
const setMemberStateRegular = async (req, res) => {
  // 해당 이메일 스케쥴러 유뮤 검사
  if (temp_member_scheduler.hasOwnProperty(req.body.mbr_email)) {
    const updatedRow = await Member.update(
      {
        mbr_state: member_table.mbr_state.JOINED,
      },
      {
        where: {
          mbr_cert_number: req.body.mbr_cert_number,
          mbr_email: req.body.mbr_email,
        },
      }
    )

    // 업데이트 성공
    if (updatedRow[0]) {
      // 스케쥴러 off
      temp_member_scheduler[req.body.mbr_email].temp_member.verified = true
      // 인증 코드 삭제
      updateMemberSertCode(req.body.mbr_email)
      res.status(200).send({ message: RM['026'] })
    }
    // 오입력
    else res.status(500).send({ message: RM['034'] })
  } else {
    res.status(500).send({ message: RM['010'] })
  }
}

// ③ 비밀번호 찾기
const findPasswords = async (req, res) => {
  const cert = v4().substring(0, member_table.MBR_CERT_NUM)
  const updatedRow = await Member.update(
    { mbr_cert_number: cert },
    {
      where: {
        mbr_email: req.body.mbr_email,
        mbr_state: member_table.mbr_state.JOINED,
      },
    }
  )

  // 업데이트 성공
  if (updatedRow[0]) {
    // 한 아이디당, 하루 메일 전송 횟수 제한 설정
    if (!mail_count.hasOwnProperty(req.body.mbr_email)) {
      mail_count[req.body.mbr_email] = mail.MAILCOUNT
    }
    // 메일 전송
    if (mail_count[req.body.mbr_email]) {
      delivery(req.body.mbr_email, cert, true)
      mail_count[req.body.mbr_email] = mail_count[req.body.mbr_email] - 1
      res.status(200).send({ message: RM['040'] })
    } else {
      res.status(500).send({ message: RM['091'] })
    }
  } else {
    res.status(500).send({ message: RM['090'] })
  }
}

// ④. 비밀번호 재설정
const setPasswords = (req, res) => {
  let old_password = ''
  let pwChk = pwCheck(req.body.mbr_pw)

  Member.findOne({
    where: {
      mbr_email: req.body.mbr_email,
      mbr_state: member_table.mbr_state.JOINED,
    },
  })
    .then(findMember => {
      // 検証: 1. 이메일 오입력 2. 미가입 회원
      if (!findMember) throw new Error(RM['090'])
      else {
        return Member.findOne({
          where: {
            mbr_cert_number: req.body.mbr_cert_number,
          },
        })
      }
    })
    .then(findMember => {
      // 検証: 해당 이메일에 대한 설정번호 오입력
      if (!findMember) {
        throw new Error(RM['093'])
      } else {
        // 검증 완료 시, 기존 비밀번호 임시 저장
        old_password = findMember['dataValues']['mbr_pw']
      }

      // 検証: 새로운 비밀번호 유효성 검사
      if (pwChk) {
        throw new Error(pwChk)
      }
      // 検証: 기존 비밀번호 동일
      else if (comparePassword(req.body.mbr_pw, old_password)) {
        throw new Error(RM['094'])
      } else {
        return Member.update(
          { mbr_pw: hashPassword(req.body.mbr_pw) },
          {
            where: {
              mbr_state: member_table.mbr_state.JOINED,
            },
          }
        )
      }
    })
    .then(updateMember => {
      if (!updateMember) {
        throw new Error(RM['099'])
      } else {
        res.status(200).send({ message: RM['095'] })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

// 関数. 전체 유효성 검사
const regCheck = info => {
  let msg = ''

  if (!R.idRegex.test(info.mbr_id)) {
    msg = RM['080']
  } else if (!R.passwordRegex.test(info.mbr_pw)) {
    msg = RM['081']
  } else if (!R.nicknameRegex.test(info.mbr_nickname)) {
    msg = RM['082']
  } else if (!R.emailRegex.test(info.mbr_email)) {
    msg = RM['083']
  }

  return msg
}

// 関数. 개별 유효성 검사(비밀번호)
const pwCheck = pw => {
  let msg = ''

  if (!R.passwordRegex.test(pw)) msg = RM['081']
  return msg
}

// 関数. 중복 검사
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

// 関数. 스케쥴러
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
        job.cancel()
        endScheduler(temp_member.email)
        return
      }

      // 미인증 10분 초과
      if (limit >= member_table.CONT_SCHEDULER_TIME) {
        console.log(RM['033'])
        deleteNoSertMember(temp_member.email)

        job.cancel()
        endScheduler(temp_member.email)
        return
      }
    }
  )

  // 임시 회원 스케쥴러 객체에 저장
  temp_member_scheduler[mbr_email] = {
    temp_member,
    job,
  }
}

// 関数. 미인증 회원 삭제
const deleteNoSertMember = async mail => {
  await Member.destroy({ where: { mbr_email: mail } })
  console.log(RM['017'])
}

// 関数. 인증코드 삭제
const updateMemberSertCode = async mail => {
  await Member.update({ mbr_cert_number: null }, { where: { mbr_email: mail } })
  console.log(RM['019'])
}

// 関数. 스케쥴러 종료
const endScheduler = mail => {
  // 객체 삭제 확인
  if (temp_member_scheduler[mail]) {
    temp_member_scheduler[mail].job.cancel()
    delete temp_member_scheduler[mail]
    console.log(RM['031'], mail)
  }
}

// 関数. 비밀번호 해쉬화
const hashPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// 関数. 비밀번호 해쉬 일치
const comparePassword = (password, hash) =>
  (result = bcrypt.compareSync(password, hash))

// 自動. 매 자정 실행
schedule.scheduleJob('0 0 * * * *', () => {
  console.log(RM['092'])
  // 비밀번호 찾기 횟수 초기화
  mail_count = {}
})

module.exports = {
  addMember,
  setMemberStateRegular,
  findPasswords,
  setPasswords,
}
