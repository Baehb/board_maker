nodemailer = require('nodemailer')
const { MAIL_ID, MAIL_PW } = require('../config/secretData.js')
const { mail } = require('../config/constants.js')

const delivery = (toMail, certNum, code = false) => {
  // 발송자 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_ID,
      pass: MAIL_PW,
    },
  })

  const mailOptions = {
    from: MAIL_ID,
    to: toMail,
    // code값이 존재하면, 비밀번호 재발급에서 발송
    subject: code ? mail.FINDMAIL : mail.CERTMAIL,
    html: code
      ? mail.mailform(certNum, mail.FINDMAILTEXT)
      : mail.mailform(certNum, mail.CERTMAILTEXT),
  }

  // 메일 전송
  transporter.sendMail(mailOptions)
}

module.exports = {
  delivery,
}
