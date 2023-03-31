const db = require('../models')
const { member_table, settings_table } = require('../config/constants.js')
const uuid = require('uuid')
const date = new Date()

const Member = db.member

// 1. 회원가입
const addMember = async (req, res) => {
    try {
        let info = {
            // 실제 입력값
            mbr_id: req.body.mbr_id,
            mbr_pw: req.body.mbr_pw,
            mbr_nickname : req.body.mbr_nickname,
            mbr_email : req.body.mbr_email,

            // 상수값 주입
            mbr_state : member_table.mbr_state.PENDING,
            mbr_grade : member_table.mbr_grade.USER.LEVEL,
            mbr_score : settings_table.SIGN_UP_SCORE,
            
            // 생성값 주입
            mbr_code: uuid.v4(),
            mbr_signup_date : date
        }

        await Member.create(info)
        res.status(200).send({message: "OK."})

    } catch(error){
        console.error(error);
        res.status(500).send({ message: "Error occurred while creating a member." })
    }
}

// 2. 특정회원정보 취득
// 3. 회원정보 수정
// 4. 회원 탈퇴(구분치 변경 : 가입 => 탈퇴 )

module.exports = {
    addMember
}