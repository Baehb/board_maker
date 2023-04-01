const { settings_table } = require('./constants.js')

// 세팅값 API요청 => 세팅 테이블에 값이 없을 경우에만, 새로 세팅값을 넣어준다.
// 세팅 테이블 row가 2개 이상이 되는 것을 방지한다.
const settingRowInsert = info => {
  fetch('http://localhost/api/member/getAllSettingValues', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch.')
      return response.json()
    })
    .then(data => {
      if (data.length) throw new Error('Data already exists.')

      // 세팅값 삽입
      info.settings.create({
        pk_setting: 'R',
        main_num: settings_table.MAIN_DISPLAY_NUM,
        comments_num: settings_table.POST_ADD_REPLY_NUM,
        add_comments_num: settings_table.POST_REPLY_NUM,
        score_val: settings_table.SIGN_UP_SCORE,
      })
    })
    .then(row => {
      console.log('New row is created.', row)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
  settingRowInsert,
}
