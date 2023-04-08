const constants = {
  idRegex: /^[a-z][0-9a-z]{3,11}$/,
  passwordRegex: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-zd!@#$%^&*]{8,20}$/,
  nicknameRegex: /^[가-힣]{2,6}$/,
  emailRegex:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
}

export default constants
