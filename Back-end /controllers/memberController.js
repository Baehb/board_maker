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

  //検証: 유효성 검사
  const valMsg = regCheck(info)
  if (valMsg) return res.status(400).send({ message: valMsg })

  addMemberOne({ ...info, mbr_pw: hashPassword(info.mbr_pw) })
    //메일 발송
    .then(() => {
      delivery(info.mbr_email, info.mbr_cert_number)
    })
    //성공 응답
    .then(() => {
      // 스케쥴러 실행
      setScheduler(info)
      res.status(200).send({ message: RM['025'] })
    })
    .catch(error => {
      // 컬럼 중복
      if (error.parent.code === 'ER_DUP_ENTRY')
        res.status(400).send({ message: duplicateEntryCheck(error) })
      else res.status(500).send({ message: error.message })
    })
}

// ② 회원가입(정식)
const setMemberStateRegular = (req, res) => {
  setMemberOne(req.body)
    .then(result => {
      if (result[0]) {
        // 스케쥴러 off
        temp_member_scheduler[req.body.mbr_email].temp_member.verified = true
        // 인증 코드 삭제
        return updateMemberSertCode(req.body.mbr_email)
      } else throw new Error(RM['034'])
    })
    .then(result => {
      if (result[0]) {
        console.log(RM['012'])
        res.status(200).send({ message: RM['026'] })
      } else throw new Error(RM['013'])
    })
    .catch(error => {
      res.status(500).send({ message: error.message })
    })
}

// ③ 비밀번호 찾기
const findPasswords = (req, res) => {
  const cert = v4().substring(0, member_table.MBR_CERT_NUM)

  findRequest(cert, req.body)
    .then(result => {
      // 업데이트 성공
      if (result[0]) {
        // 한 아이디당, 하루 메일 전송 횟수 제한 설정
        if (!mail_count.hasOwnProperty(req.body.mbr_email))
          mail_count[req.body.mbr_email] = mail.MAILCOUNT

        // 메일 전송
        if (mail_count[req.body.mbr_email]) {
          delivery(req.body.mbr_email, cert, true)
          mail_count[req.body.mbr_email] = mail_count[req.body.mbr_email] - 1
          res.status(200).send({ message: RM['040'] })
        } else throw new Error(RM['091'])
      } else throw new Error(RM['090'])
    })
    .catch(error => {
      res.status(500).send({ message: error.message })
    })
}

// ④. 비밀번호 재설정
const setPasswords = (req, res) => {
  setNewPass(req.body)
    .then(result => {
      // 検証: 1. 이메일 오입력 2. 미가입 회원
      if (!result) throw new Error(RM['090'])
      // 検証: 설정번호 검사
      else return checkCertNum(req.body.mbr_cert_number)
    })
    .then(result => {
      // 検証: 해당 이메일에 대한 설정번호 오입력 검사
      const old_password = result
        ? result['dataValues']['mbr_pw']
        : (() => {
            throw new Error(RM['093'])
          })()

      // 検証: 새로운 비밀번호 유효성 검사
      if (!R.passwordRegex.test(req.body.mbr_pw)) throw new Error(RM['081'])
      // 検証: 기존 비밀번호 동일
      else if (comparePassword(req.body.mbr_pw, old_password))
        throw new Error(RM['094'])
      // 패스워드 업데이트
      else return updatePassword(req.body.mbr_pw)
    })
    .then(result => {
      if (!result) throw new Error(RM['099'])
      else res.status(200).send({ message: RM['095'] })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

// 関数. 전체 유효성 검사
const regCheck = ({ mbr_id, mbr_pw, mbr_nickname, mbr_email }) => {
  let msg = ''

  if (!R.idRegex.test(mbr_id)) msg = RM['080']
  if (!R.passwordRegex.test(mbr_pw)) msg = RM['081']
  if (!R.nicknameRegex.test(mbr_nickname)) msg = RM['082']
  if (!R.emailRegex.test(mbr_email)) msg = RM['083']

  return msg
}

// 関数. 중복 검사
const duplicateEntryCheck = error => {
  let error_key = Object.keys(error.fields)[0] || 'default'

  const message = {
    mbr_id: RM['022'],
    mbr_nickname: RM['023'],
    mbr_email: RM['024'],
    default: RM['099'],
  }

  return message[error_key]
}

// 関数. 스케쥴러
const setScheduler = ({ mbr_email, mbr_signup_date }) => {
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
      if (
        limit >= member_table.CONT_SCHEDULER_TIME &&
        deleteNoSertMember(temp_member.email)
      ) {
        job.cancel()
        endScheduler(temp_member.email)
        console.log(RM['017'], RM['033'])
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

// 関数. 스케쥴러 종료
const endScheduler = mail => {
  // 객체 삭제 확인
  if (temp_member_scheduler[mail]) {
    temp_member_scheduler[mail].job.cancel()
    delete temp_member_scheduler[mail]
    console.log(RM['031'], mail)
  }
}

// 自動. 스케쥴러 매 자정 실행
schedule.scheduleJob('0 0 * * * *', () => {
  // 비밀번호 찾기 횟수 초기화
  mail_count = {}
  console.log(RM['092'])
})

// 関数. 비밀번호 해쉬화
const hashPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// 関数. 비밀번호 해쉬 일치
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash)

// 関数. 미인증 회원 삭제
const deleteNoSertMember = async mail =>
  await Member.destroy({ where: { mbr_email: mail } })

// 関数. 인증코드 삭제
const updateMemberSertCode = async mail =>
  await Member.update({ mbr_cert_number: null }, { where: { mbr_email: mail } })

// 関数. 비밀번호 업데이트
const updatePassword = async password =>
  await Member.update(
    { mbr_pw: hashPassword(password), mbr_cert_number: null },
    {
      where: {
        mbr_state: member_table.mbr_state.JOINED,
      },
    }
  )

// 関数. 설정번호 체크
const checkCertNum = async cert =>
  await Member.findOne({
    where: {
      mbr_cert_number: cert,
    },
  })

//　関数. 회원 추가
const addMemberOne = async info => await Member.create(info)

//　関数. 회원상태 변경(임시 => 정식)
const setMemberOne = async ({ mbr_cert_number, mbr_email }) =>
  await Member.update(
    {
      mbr_state: member_table.mbr_state.JOINED,
    },
    {
      where: {
        mbr_cert_number: mbr_cert_number,
        mbr_email: mbr_email,
      },
    }
  )

//　関数. 재설정번호 업데이트
const findRequest = async (cert, { mbr_email }) =>
  await Member.update(
    { mbr_cert_number: cert },
    {
      where: {
        mbr_email: mbr_email,
        mbr_state: member_table.mbr_state.JOINED,
      },
    }
  )

//　関数. 회원 조회
const setNewPass = async ({ mbr_email }) =>
  await Member.findOne({
    where: {
      mbr_email: mbr_email,
      mbr_state: member_table.mbr_state.JOINED,
    },
  })

module.exports = {
  addMember,
  setMemberStateRegular,
  findPasswords,
  setPasswords,
}
