const memberController = require('../controllers/memberController.js')

const router = require('express').Router()

// ① 회원 가입(임시)
router.post('/addMember', memberController.addMember)
// ② 회원 가입(정식)
router.post('/setMemberStateRegular', memberController.setMemberStateRegular)
// ③ 비밀번호 찾기
router.post('/findPasswords', memberController.findPasswords)
// ④ 비밀번호 재설정
router.post('/setPasswords', memberController.setPasswords)

module.exports = router
