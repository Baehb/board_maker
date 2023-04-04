nodemailer = require('nodemailer')
const { MAIL_ID, MAIL_PW } = require('../config/secretData.js')
const { mail } = require('../config/constants.js')

const delivery = (toMail, certNum, code = false) => {
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
    subject: mail.CERTMAIL,
    html: mail.mailform(certNum, mail.CERTMAILTEXT),
  }

  // 비밀번호 찾기
  if (code) {
    mailOptions.subject = mail.FINDMAIL
    mailOptions.html = mail.mailform(certNum, mail.FINDMAILTEXT)
  }

  // 메일 전송
  transporter.sendMail(mailOptions)
}

module.exports = {
  delivery,
}
