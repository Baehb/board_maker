const { member_table } = require('../config/constants')

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('member_table', {
    mbr_code: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      comment: '멤버 코드 : UUID가 들어간다.',
    },
    mbr_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      comment: '아이디 : 4~12글자까지 영문으로 입력받을 수 있다.',
    },
    mbr_pw: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment:
        '비밀번호 : 8~20자까지 영문으로 입력받을 수 있다. 대문자와 특수기호가 들어가야 한다. 암호화되어 해쉬 코드가 저장된다.',
    },
    mbr_nickname: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
      comment: '닉네임 : 2~6자까지 한글로 입력받을 수 있다.',
    },
    mbr_email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      comment: '이메일 : ~@~의 형태만 들어갈 수 있다.',
    },
    mbr_cert_number: {
      type: DataTypes.STRING(member_table.MBR_CERT_NUM),
      allowNull: true,
      comment:
        '인증번호 : 1. 가입 시, 이메일 인증번호가 저장된다. 정식 가입 후, 삭제된다. 2. 비밀번호 찾기 시, 재설정번호가 저장된다. 비밀번호 재설정 후 삭제된다(설정하지 않아도 스케줄러에 위하여, 5분 뒤 자동 삭제된다).',
    },
    mbr_state: {
      type: DataTypes.STRING(1),
      allowNull: false,
      comment: '※ 구분치 0 : 가입 대기(이메일 미인증) 1 : 가입 2 : 탈퇴',
    },
    mbr_grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '※ 등급치 유저 : 7 스탭 : 3 어드민 : 1',
    },
    mbr_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '회원점수 : 이 점수에서 상벌로 증감, 차감될 수 있다.',
    },
    mbr_block_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment:
        '차단기한 : 이 항목이 생겼다면, 지정된 시간까지 로그인할 수 없다.',
    },
    mbr_block_reason: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      comment: '차단 사유를 작성한다.',
    },
    mbr_signup_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '가입날짜 : 가입시간을 입력받는다.',
    },
    mbr_signin_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: '로그인날짜 : 로그인 날짜를 입력받는다.',
    },
  })

  return Member
}
