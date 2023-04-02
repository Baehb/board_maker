nodemailer = require('nodemailer')
const { MAIL_ID, MAIL_PW } = require('../config/secretData.js')
const { mail } = require('../config/constants.js')

const delivery = (toMail, certNum) => {
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
    subject: mail.subject,
    html: mail.mailform(certNum),
  }

  // 메일 전송
  transporter.sendMail(mailOptions)
}

module.exports = {
  delivery,
}
