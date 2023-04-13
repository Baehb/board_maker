const initialState = {
  tab: '1',
  termsCheck: false,
  error: Array(5).fill(false),
  form: Array(5).fill(''),
  showPasswordOne: false,
  showPasswordTwo: false,
  freeze: false,
  freezePw: false,
  responseMessage: '',
  messageOpen: false,
  theme: '',
  certEmail: '',
  certNum: '',
  forgotEmail: '',
}

const signUStore = (state = initialState, action) => {
  switch (action.type) {
    case 'ChangeTab':
      return { ...state, tab: String(action.payload) }
    case 'ChangeData':
      return { ...state, form: action.payload }
    case 'ChangeErrorValue':
      return { ...state, error: action.payload }
    case 'ChangeCheckBox':
      return { ...state, termsCheck: !state.termsCheck }
    case 'ShowPasswordOne':
      return { ...state, showPasswordOne: !state.showPasswordOne }
    case 'ShowPasswordTwo':
      return { ...state, showPasswordTwo: !state.showPasswordTwo }
    case 'SetFreeze':
      return { ...state, freeze: !state.freeze }
    case 'SetFreezePw':
      return { ...state, freezePw: !state.freeze }
    case 'SetMessage':
      return { ...state, responseMessage: action.payload }
    case 'ShowToast':
      return { ...state, messageOpen: action.payload }
    case 'SetTheme':
      return { ...state, theme: action.payload }
    case 'SetCertEmail':
      return { ...state, certEmail: action.payload }
    case 'SetCertNum':
      return { ...state, certNum: action.payload }
    case 'SetForgotEmail':
      return { ...state, forgotEmail: action.payload }
    default:
      return state
  }
}

export default signUStore
