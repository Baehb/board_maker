const { settings_table: st } = require('./constants.js')
const RM = require('./responseMessages.js')

// 세팅값 API요청 => 세팅 테이블에 값이 없을 경우에만, 새로 세팅값을 넣어준다.
// 세팅 테이블 row가 2개 이상이 되는 것을 방지한다.
const settingRowInsert = info => {
  getAllSettingValues()
    .then(response => {
      if (!response.ok) throw new Error(RM['010'])
      return response.json()
    })
    .then(response => {
      if (response.length) throw new Error(RM['014'])
      return insertSettings(info)
    })
    .then(response => {
      if (!response.hasOwnProperty('dataValues')) throw new Error(RM['099'])
      console.log(RM['015'])
    })
    .catch(error => {
      console.error(error)
    })
}

const getAllSettingValues = async () =>
  fetch(`http://localhost/api/member/getAllSettingValues`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

const insertSettings = async info =>
  await info.settings.create({
    pk_setting: st.CONSTANT_PK,
    main_num: st.MAIN_DISPLAY_NUM,
    comments_num: st.POST_ADD_REPLY_NUM,
    add_comments_num: st.POST_REPLY_NUM,
    score_val: st.SIGN_UP_SCORE,
  })

module.exports = {
  settingRowInsert,
}
