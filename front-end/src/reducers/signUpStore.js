const initialState = {
  // 共通
  responseMessage: '',
  messageOpen: false,
  theme: '',
  // SignupTab
  tab: '1',
  // SignupPage
  termsCheck: false,
  form: Array(5).fill(''),
  error: Array(5).fill(false),
  showPasswordOne: false,
  showPasswordTwo: false,
  // MailAuthTab
  certEmail: '',
  certNum: '',
  // ForgotPasswordTab
  forgotEmail: '',
  // ResetPasswordTab
  form2: Array(4).fill(''),
  show2PasswordErrorOne: false,
  show2PasswordErrorTwo: false,
  show2PasswordOne: false,
  show2PasswordTwo: false,
}

const signUStore = (state = initialState, action) => {
  switch (action.type) {
    // 共通
    case 'SetMessage':
      return { ...state, responseMessage: action.payload }
    case 'ShowToast':
      return { ...state, messageOpen: action.payload }
    case 'SetTheme':
      return { ...state, theme: action.payload }
    // SignupTab
    case 'ChangeTab':
      return { ...state, tab: String(action.payload) }
    // SignupPage
    case 'ChangeCheckBox':
      return { ...state, termsCheck: !state.termsCheck }
    case 'ChangeData':
      return { ...state, form: action.payload }
    case 'ChangeErrorValue':
      return { ...state, error: action.payload }
    case 'ShowPasswordOne':
      return { ...state, showPasswordOne: !state.showPasswordOne }
    case 'ShowPasswordTwo':
      return { ...state, showPasswordTwo: !state.showPasswordTwo }
    // MailAuthTab
    case 'SetCertEmail':
      return { ...state, certEmail: action.payload }
    case 'SetCertNum':
      return { ...state, certNum: action.payload }
    // ForgotPasswordTab
    case 'SetForgotEmail':
      return { ...state, forgotEmail: action.payload }
    // ResetPasswordTab
    case 'Change2Data':
      return { ...state, form2: action.payload }
    case 'ChangeErrorPwOne':
      return { ...state, show2PasswordErrorOne: action.payload }
    case 'ChangeErrorPwTwo':
      return { ...state, show2PasswordErrorTwo: action.payload }
    case 'Show2PasswordOne':
      return { ...state, show2PasswordOne: !state.show2PasswordOne }
    case 'Show2PasswordTwo':
      return { ...state, show2PasswordTwo: !state.show2PasswordTwo }
    default:
      return state
  }
}

export default signUStore
