const initialState = {
  tab: '1',
  termsCheck: false,
  error: Array(5).fill(false),
  form: Array(5).fill(''),
  showPasswordOne: false,
  showPasswordTwo: false,
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
    default:
      return state
  }
}

export default signUStore
