const initialState = {
  tab: '1',
  termsCheck: false,
  error: Array(5).fill(false),
  form: Array(5).fill(''),
  showPasswordOne: false,
  showPasswordTwo: false,
  freeze: false,
  responseMessage: '',
  messageOpen: false,
  theme: '',
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
      return { ...state, freeze: true }
    case 'SetMessage':
      return { ...state, responseMessage: action.payload }
    case 'ShowToast':
      return { ...state, messageOpen: action.payload }
    case 'SetTheme':
      return { ...state, theme: action.payload }
    default:
      return state
  }
}

export default signUStore
