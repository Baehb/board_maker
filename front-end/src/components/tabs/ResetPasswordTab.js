import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { regexSearch, message } from '../../config/constants.js'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import KeyIcon from '@mui/icons-material/Key'
import CheckIcon from '@mui/icons-material/Check'
import { domain } from '../../config/constants'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { icon, fontSize, center } from '../../config/commonStyle'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  Card,
  Box,
  TextField,
  Button,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material'
import { useRef } from 'react'

const ResetPasswordTab = ({ handleClick }) => {
  // 共通. dispatch 선언
  const dispatch = useDispatch()
  // 共通. 폼 값
  const form2 = useSelector(state => state.signUp.form2)
  // 共通. 변경(form専用)
  const change = (type, num, val) =>
    dispatch({
      type,
      payload: [...form2.slice(0, num), val, ...form2.slice(num + 1)],
    })
  // 特殊. 식별자 분해 할당
  const { reject, pwVal, pwConfirm } = message
  // 特殊. 미디어 쿼리 인식자
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.up('md'))

  // 1. 이메일
  const emailHandle = event => change('Change2Data', 0, event.target.value)
  // 2. 설정번호
  const certNumHandle = event => change('Change2Data', 1, event.target.value)

  // 3-1. 비밀번호(상단) 확인
  const show2PasswordOne = useSelector(state => state.signUp.show2PasswordOne)
  // 3-2. 비밀번호(상단) 보기
  const handleClickShowPasswordOne = () =>
    dispatch({ type: 'Show2PasswordOne' })
  // 3-3. 비밀번호(상단) 에러
  const show2PasswordErrorOne = useSelector(
    state => state.signUp.show2PasswordErrorOne
  )
  // 4-1. 비밀번호(하단) 확인
  const show2PasswordTwo = useSelector(state => state.signUp.show2PasswordTwo)
  // 4-2. 비밀번호(하단) 보기
  const handleClickShowPasswordTwo = () =>
    dispatch({ type: 'Show2PasswordTwo' })
  // 4-3. 비밀번호(하단) 에러
  const show2PasswordErrorTwo = useSelector(
    state => state.signUp.show2PasswordErrorTwo
  )
  // 共通(3-4). 드래그 방지
  const handleMouseDownPassword = event => event.preventDefault()
  // 共通(3-4). 비밀번호 변경
  const temp = useRef('')
  const pwHandle = event => {
    const val = event.target.value
    // 비밀번호 유효성 검사
    const result = regexSearch.passwordRegex.test(val)
    // 비밀번호 입력
    if (event.target.id === 'PwOne') {
      temp.current = val
      dispatch({
        type: 'ChangeErrorPwOne',
        payload: event.target.value ? !result : false,
      })
      change('Change2Data', 2, event.target.value)
    }
    // 비밀번호 확인
    if (event.target.id === 'PwTwo') {
      dispatch({
        type: 'ChangeErrorPwTwo',
        payload: val.length && temp.current !== val ? true : false,
      })
      change('Change2Data', 3, event.target.value)
    }
  }
  // 通信. axios 비동기 처리
  const submitHandle = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${domain}/api/member/setPasswords`,
        new FormData(event.target),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      // 가입 성공(200)
      // 입력란 초기화
      dispatch({
        type: 'Change2Data',
        payload: Array(4).fill(''),
      })
      dispatch({ type: 'SetMessage', payload: response.data.message })
      dispatch({ type: 'SetTheme', payload: 'success' })
      handleClick()
    } catch (error) {
      dispatch({ type: 'SetTheme', payload: 'error' })
      // 네트워크 오류
      if (error.code === 'ERR_NETWORK') {
        dispatch({ type: 'SetMessage', payload: reject })
        // 입력 오류
      } else if (error.response.status === 400) {
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
        dispatch({ type: 'SetTheme', payload: 'warning' })
      } else {
        // 그 외 에러(404, 500)
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
      }
      handleClick()
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
            <Box sx={center}>
              <MailOutlineIcon sx={icon} />
              <TextField
                sx={{ width: '50%' }}
                label='이메일'
                name='mbr_email'
                value={form2[0]}
                onChange={emailHandle}
                helperText=' '
                variant='standard'
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={center}>
              <PasswordIcon sx={icon} />
              <TextField
                sx={{ width: '50%' }}
                label='설정번호'
                name='mbr_cert_number'
                value={form2[1]}
                onChange={certNumHandle}
                helperText=' '
                variant='standard'
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={center}>
              <KeyIcon sx={icon} />
              <FormControl
                sx={{
                  width: '50%',
                  // 모바일 화면에서, 에러 텍스트 발생시 비밀번호 아이콘 움직이지 않도록 보정값 추가.
                  marginBottom: !media && show2PasswordErrorOne && '0.7vh',
                }}
                variant='standard'
                error={show2PasswordErrorOne}
                onChange={pwHandle}
                disabled={form2[3].length > 0}
              >
                <InputLabel htmlFor='standard-adornment-password'>
                  비밀번호
                </InputLabel>
                <Input
                  id='PwOne'
                  value={form2[2]}
                  autoComplete='new-password'
                  type={show2PasswordOne ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='passwordVisOne'
                        onClick={handleClickShowPasswordOne}
                        onMouseDown={handleMouseDownPassword}
                        tabIndex={-1}
                      >
                        {show2PasswordOne ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {show2PasswordErrorOne ? (
                  <FormHelperText sx={{ fontSize: { md: '12px', xs: '9px' } }}>
                    {media ? pwVal.long : pwVal.short}
                  </FormHelperText>
                ) : (
                  <FormHelperText children=' ' />
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={center}>
              <CheckIcon sx={icon} />
              <FormControl
                sx={{ width: '50%' }}
                variant='standard'
                onChange={pwHandle}
                error={show2PasswordErrorTwo}
                // 해제 조건 : 1. 비밀번호(상단) 입력(○) 2. 에러(☓)
                disabled={!form2[2] || show2PasswordErrorOne}
              >
                <InputLabel htmlFor='standard-adornment-password'>
                  비밀번호 재입력
                </InputLabel>
                <Input
                  id='PwTwo'
                  name='mbr_pw'
                  value={form2[3]}
                  autoComplete='new-password'
                  type={show2PasswordTwo ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visiobility'
                        onClick={handleClickShowPasswordTwo}
                        onMouseDown={handleMouseDownPassword}
                        tabIndex={-1}
                      >
                        {show2PasswordTwo ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {show2PasswordErrorTwo ? (
                  <FormHelperText children={pwConfirm} />
                ) : (
                  <FormHelperText children=' ' />
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              size='x-large'
              sx={{ width: '100%', fontWeight: 'bold', fontSize }}
              variant='contained'
              // 통과 조건 : 1. 모든 에러(☓) 2. 모든 폼 입력(○)
              disabled={
                show2PasswordErrorOne ||
                show2PasswordErrorTwo ||
                !form2.every(item => item)
              }
              type='submit'
            >
              재설정
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ResetPasswordTab
