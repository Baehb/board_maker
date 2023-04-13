import Box from '@mui/material/Box'
import { Card, TextField, Button } from '@mui/material'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import axios from 'axios'
import { icon, fontSize } from '../../config/commonStyle'

const ForgotPassword = props => {
  const forgotEmail = useSelector(state => state.signUp.forgotEmail)
  const dispatch = useDispatch()

  const forgotEmailHandle = event => {
    dispatch({
      type: 'SetForgotEmail',
      payload: event.target.value,
    })
  }

  const submitHandle = async event => {
    event.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost/api/member/findPasswords',
        new FormData(event.target),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      // 요청 성공(200)
      dispatch({ type: 'SetFreezePw' })
      dispatch({ type: 'SetMessage', payload: response.data.message })
      dispatch({ type: 'SetTheme', payload: 'success' })
      props.handleClick()

      // 3초 후 암호재설정 탭 자동 이동
      await new Promise(resolve => setTimeout(resolve, 3000))
      dispatch({ type: 'ChangeTab', payload: 4 })
    } catch (error) {
      dispatch({ type: 'SetTheme', payload: 'error' })
      // 네트워크 오류
      if (error.code === 'ERR_NETWORK') {
        dispatch({ type: 'SetMessage', payload: '서버가 응답하지 않습니다.' })
        // 재설정 유효 요청수 초과
      } else if (error.response.status === 429) {
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
        dispatch({ type: 'SetTheme', payload: 'warning' })
      } else {
        // 그 외 에러(404, 500)
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
      }
      props.handleClick()
    }
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
                value={forgotEmail}
                onChange={forgotEmailHandle}
                helperText=' '
                variant='standard'
              />
            </Box>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button
              size='x-large'
              sx={{ width: '100%', fontWeight: 'bold', fontSize }}
              variant='contained'
              disabled={!forgotEmail}
              type='submit'
            >
              재발급
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ForgotPassword
