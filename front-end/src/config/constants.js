export const regexSearch = {
  idRegex: /^[a-z][0-9a-z]{3,11}$/,
  passwordRegex: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-zd!@#$%^&*]{8,20}$/,
  nicknameRegex: /^[가-힣]{2,6}$/,
  emailRegex:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
}

export const message = {
  reject: '서버가 응답하지 않습니다.',
  agree: '해당 내용에 동의합니다.',
  idVal: '소문자로 시작 및 숫자를 조합할 수 있습니다. (4~12자)',
  pwVal: {
    long: '대문자, 특수문자를 최소 하나 이상 포함하세요. (8~20자)',
    short: '대・특수문자 최소 하나 이상 포함 (8~20)',
  },
  pwConfirm: '패스워드와 동일하게 입력하세요.',
  nickVal: '한글 닉네임만 가능합니다. (2~6자)',
  emailVal: '올바른 형태의 이메일을 입력하세요.',
}

export const domain = `http://localhost`
