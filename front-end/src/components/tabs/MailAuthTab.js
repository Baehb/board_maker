import Box from '@mui/material/Box'
import { Card, TextField, Button } from '@mui/material'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import axios from 'axios'
import icon from '../../config/commonStyle'

const MailAuthTab = () => {
  // 아이디
  const certEmail = useSelector(state => state.signUp.certEmail)
  // 인증번호
  const certNum = useSelector(state => state.signUp.certNum)

  const dispatch = useDispatch()
  // 토스트 메시지 핸들
  const handleClick = () => dispatch({ type: 'ShowToast', payload: true })
  // 아이디 핸들
  const certEmailHandle = event =>
    dispatch({ type: 'SetCertEmail', payload: event.target.value })
  // 비밀번호 핸들
  const certNumHandle = event =>
    dispatch({ type: 'SetCertNum', payload: event.target.value })

  // 通信. axios 비동기 처리
  const submitHandle = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost/api/member/setMemberStateRegular',
        new FormData(event.target),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      // 가입 성공(200)
      dispatch({ type: 'SetMessage', payload: response.data.message })
      dispatch({ type: 'SetTheme', payload: 'success' })
    } catch (err) {
      dispatch({ type: 'SetTheme', payload: 'error' })
      if (err.code === 'ERR_NETWORK') {
        dispatch({ type: 'SetMessage', payload: '서버가 응답하지 않습니다.' })
        // 가입 실패(500)
      } else
        dispatch({ type: 'SetMessage', payload: err.response.data.message })
    }

    handleClick()
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

const fontSize = {
  xs: '11px',
  md: '15px',
}

export default MailAuthTab
