import Box from '@mui/material/Box'
import { Card, TextField, Button } from '@mui/material'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import axios from 'axios'
import { icon, fontSize } from '../../config/commonStyle'
import { domain } from '../../config/constants'

const MailAuthTab = props => {
  // 아이디
  const certEmail = useSelector(state => state.signUp.certEmail)
  // 인증번호
  const certNum = useSelector(state => state.signUp.certNum)

  const dispatch = useDispatch()
  // 아이디 핸들
  const certEmailHandle = event =>
    dispatch({ type: 'SetCertEmail', payload: event.target.value })
  // 설정번호 핸들
  const certNumHandle = event =>
    dispatch({ type: 'SetCertNum', payload: event.target.value })

  // 通信. axios 비동기 처리
  const submitHandle = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${domain}/api/member/setMemberStateRegular`,
        new FormData(event.target),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      // 가입 성공(200)
      // 회원가입란 초기화
      dispatch({
        type: 'SetFreeze',
      })
      dispatch({
        type: 'ChangeCheckBox',
      })
      dispatch({
        type: 'ChangeData',
        payload: Array(5).fill(''),
      })
      // 인증란 초기화
      dispatch({
        type: 'SetCertEmail',
        payload: '',
      })
      dispatch({
        type: 'SetCertNum',
        payload: '',
      })
      dispatch({ type: 'SetMessage', payload: response.data.message })
      dispatch({ type: 'SetTheme', payload: 'success' })
    } catch (error) {
      dispatch({ type: 'SetTheme', payload: 'error' })
      // 네트워크 오류
      if (error.code === 'ERR_NETWORK') {
        dispatch({ type: 'SetMessage', payload: '서버가 응답하지 않습니다.' })
        // 가입 실패(500)
      } else
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
    }

    props.handleClick()
  }

  return (
    <Box
      sx={{
        marginTop: {
          md: '20%',
          xs: '30%',
        },
      }}
    >
      <Card
        sx={{
          margin: { md: '15%', xs: '0%' },
        }}
        raised={false}
      >
        <Grid container component='form' onSubmit={submitHandle}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <MailOutlineIcon sx={icon} />
              <TextField
                sx={{ width: '50%' }}
                label='이메일'
                name='mbr_email'
                value={certEmail}
                onChange={certEmailHandle}
                helperText=' '
                variant='standard'
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <PasswordIcon sx={icon} />
              <TextField
                sx={{ width: '50%' }}
                label='인증번호'
                name='mbr_cert_number'
                value={certNum}
                onChange={certNumHandle}
                helperText=' '
                variant='standard'
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              size='x-large'
              sx={{ width: '100%', fontWeight: 'bold', fontSize }}
              variant='contained'
              disabled={!(certEmail && certNum)}
              type='submit'
            >
              인증
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default MailAuthTab
