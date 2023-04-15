import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { regexSearch } from '../../config/constants.js'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import KeyIcon from '@mui/icons-material/Key'
import CheckIcon from '@mui/icons-material/Check'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// import axios from 'axios'
import { icon, fontSize, center } from '../../config/commonStyle'
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
const ResetPasswordTab = props => {
  const dispatch = useDispatch()
  const form2 = useSelector(state => state.signUp.form2)

  const change = (type, num, val) =>
    dispatch({
      type,
      payload: [...form2.slice(0, num), val, ...form2.slice(num + 1)],
    })

  const emailHandle = event => change('Change2Data', 0, event.target.value)
  const certNumHandle = event => change('Change2Data', 1, event.target.value)

  // 비밀번호(상단) 확인
  const show2PasswordOne = useSelector(state => state.signUp.show2PasswordOne)
  // 비밀번호(상단) 보기
  const handleClickShowPasswordOne = () =>
    dispatch({ type: 'Show2PasswordOne' })
  // 비밀번호(상단) 에러
  const show2PasswordErrorOne = useSelector(
    state => state.signUp.show2PasswordErrorOne
  )

  // 비밀번호(하단) 확인
  const show2PasswordTwo = useSelector(state => state.signUp.show2PasswordTwo)
  // 비밀번호(하단) 보기
  const handleClickShowPasswordTwo = () =>
    dispatch({ type: 'Show2PasswordTwo' })
  // 비밀번호(하단) 에러
  const show2PasswordErrorTwo = useSelector(
    state => state.signUp.show2PasswordErrorTwo
  )
  // 共通. 드래그 방지
  const handleMouseDownPassword = event => event.preventDefault()
  // 共通. 비밀번호 변경
  const temp = useRef('')
  const pwHandle = event => {
    const val = event.target.value
    // 비밀번호 유효성 검사
    const result = regexSearch.passwordRegex.test(val)
    // 비밀번호
    if (event.target.id === 'PwOne') {
      temp.current = val
      dispatch({
        type: 'ChangeErrorPwOne',
        payload: event.target.value ? result : true,
      })
      change('Change2Data', 2, event.target.value)
    }

    if (event.target.id === 'PwTwo') {
      dispatch({
        type: 'ChangeErrorPwTwo',
        payload: event.target.value ? temp.current === val : true,
      })
      change('Change2Data', 3, event.target.value)
    }
  }

  // props.handleClick()
  // const submitHandle = () => {}

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
        <Grid
          container
          // component='form'
          // onSubmit={submitHandle}
        >
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
                name='mbr_email'
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
                sx={{ width: '50%' }}
                variant='standard'
                error={!show2PasswordErrorOne}
                onChange={pwHandle}
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
                {!show2PasswordErrorOne ? (
                  <FormHelperText
                    children='대・특수문자를 최소 하나 이상 포함 (8~20)'
                    sx={{ fontSize: { xs: '1px' } }}
                  />
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
                error={!show2PasswordErrorTwo}
                // 해제 조건 : 1. 비밀번호(상단) 입력(○) 2. 에러(☓)
                disabled={!(form2[2] && show2PasswordErrorOne)}
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
                {!show2PasswordErrorTwo ? (
                  <FormHelperText children='패스워드와 동일하게 입력하세요.' />
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
                !show2PasswordErrorOne && // false
                !show2PasswordErrorTwo && // false
                form2.every(item => item) // true
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
