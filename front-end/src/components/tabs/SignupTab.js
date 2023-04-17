import { loremIpsum } from 'react-lorem-ipsum'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import KeyIcon from '@mui/icons-material/Key'
import CheckIcon from '@mui/icons-material/Check'
import BadgeIcon from '@mui/icons-material/Badge'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import React, { useRef } from 'react'
import { domain, regexSearch, message } from '../../config/constants.js'
import { icon, fontSize } from '../../config/commonStyle'

import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material'

const Signuptab = ({ handleClick }) => {
  // 共通. dispatch 선언
  const dispatch = useDispatch()
  // 共通. 폼 값
  const form = useSelector(state => state.signUp.form)
  // 共通. 식별자 분해 할당
  const { reject, agree, idVal, pwVal, pwConfirm, nickVal, emailVal } = message
  // 共通. 에러
  const error = useSelector(state => state.signUp.error)
  // 共通. 변경(form, error専用)
  // 1. type : Store-Type : String 2. type2 : form : error : Boolean
  // 3. num : Array[num] : Integer 4. val : Value : *
  const change = (type, type2, num, val) => {
    let newArray = [...(type2 ? form : error)]
    newArray[num] = val

    dispatch({
      type,
      payload: newArray,
    })
  }
  // 共通. 값 변경 공통 요청(form, error専用)
  const changeReq = (event, result, num) => {
    // 값 유무
    event.target.value
      ? change('ChangeErrorValue', false, num, !result)
      : change('ChangeErrorValue', false, num, false)

    // 요청자 변경
    change('ChangeData', true, num, event.target.value)
  }

  // 1. 체크박스 : termsCheck
  const termsCheck = useSelector(state => state.signUp.termsCheck)
  const handleCheckboxChange = () => dispatch({ type: 'ChangeCheckBox' })

  // 2-2. 아이디
  const idHandle = event => {
    const result = regexSearch.idRegex.test(event.target.value)
    changeReq(event, result, 0)
  }

  // 3-1. 비밀번호(상단) 확인
  const showPasswordOne = useSelector(state => state.signUp.showPasswordOne)
  // 3-2. 비밀번호(상단) 보기
  const handleClickShowPasswordOne = () => dispatch({ type: 'ShowPasswordOne' })
  // 4-1. 비밀번호(하단) 확인
  const showPasswordTwo = useSelector(state => state.signUp.showPasswordTwo)
  // 4-2. 비밀번호(하단) 보기
  const handleClickShowPasswordTwo = () => dispatch({ type: 'ShowPasswordTwo' })
  // 共通(3-4). 드래그 방지
  const handleMouseDownPassword = event => event.preventDefault()
  // 共通(3-4). 비밀번호 변경
  const temp = useRef('')
  const pwHandle = event => {
    const val = event.target.value
    // 비밀번호 유효성 검사
    const result = regexSearch.passwordRegex.test(val)

    // 비밀번호
    if (event.target.id === 'ChangePwValueOne') {
      temp.current = val
      changeReq(event, result, 1)
    }
    // 비밀번호 확인
    if (event.target.id === 'ChangePwValueTwo')
      changeReq(event, temp.current === val, 2)
  }

  // 4. 닉네임
  const nickHandle = event => {
    const result = regexSearch.nicknameRegex.test(event.target.value)
    changeReq(event, result, 3)
  }

  // 5. 이메일
  const emailHandle = event => {
    const result = regexSearch.emailRegex.test(event.target.value)
    changeReq(event, result, 4)
  }

  // 通信. axios 비동기 처리
  const submitHandle = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${domain}/api/member/addMember`,
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
        type: 'ChangeCheckBox',
      })
      dispatch({
        type: 'ChangeData',
        payload: Array(5).fill(''),
      })
      dispatch({ type: 'SetMessage', payload: response.data.message })
      dispatch({ type: 'SetTheme', payload: 'success' })
      handleClick()

      // 3초 후 메일인증 탭 자동 이동
      await new Promise(resolve => setTimeout(resolve, 3000))
      dispatch({ type: 'ChangeTab', payload: 2 })
    } catch (error) {
      dispatch({ type: 'SetTheme', payload: 'error' })
      if (error.code === 'ERR_NETWORK') {
        // 통신 실패
        dispatch({ type: 'SetMessage', payload: reject })
      } else if (error.response.status === 409) {
        // 중복 처리(409)
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
        dispatch({ type: 'SetTheme', payload: 'warning' })
      } else {
        // 그 외 에러(500)
        dispatch({ type: 'SetMessage', payload: error.response.data.message })
      }
      handleClick()
    }
  }

  return (
    <Grid container>
      {/* 약관 영역 */}
      <Grid container>
        <Grid item xs={12}>
          <TextField
            sx={{ width: '100%', marginTop: '3vh' }}
            multiline
            rows={8}
            InputProps={{
              readOnly: true,
              sx: { fontSize: '20px' },
            }}
            value={loremIpsum({ p: 10 })}
            variant='filled'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ display: 'flex', justifyContent: 'right', marginTop: '3vh' }}
            control={
              <Checkbox checked={termsCheck} onChange={handleCheckboxChange} />
            }
            label={agree}
          />
        </Grid>
      </Grid>
      {/* 폼 영역 */}
      <Grid container component='form' onSubmit={submitHandle}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PermIdentityIcon sx={icon} />
            <TextField
              sx={{ width: '100%', marginTop: '0vh' }}
              label='아이디'
              name='mbr_id'
              autoComplete='username'
              variant='standard'
              value={form[0]}
              error={error[0]}
              onChange={idHandle}
              helperText={error[0] ? idVal : ' '}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {/* 비밀번호 */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <KeyIcon sx={icon} />
            <FormControl
              sx={{ width: '100%', marginTop: '-0.75vh' }}
              variant='standard'
              error={error[1]}
              onChange={pwHandle}
              disabled={form[2].length > 0}
            >
              <InputLabel htmlFor='standard-adornment-password'>
                비밀번호
              </InputLabel>
              <Input
                id='ChangePwValueOne'
                value={form[1]}
                autoComplete='new-password'
                type={showPasswordOne ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='passwordVisOne'
                      onClick={handleClickShowPasswordOne}
                      onMouseDown={handleMouseDownPassword}
                      tabIndex={-1}
                    >
                      {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {error[1] ? (
                <FormHelperText children={pwVal.long} />
              ) : (
                <FormHelperText children=' ' />
              )}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CheckIcon sx={icon} />
            <FormControl
              sx={{ width: '100%', marginTop: '-0.75vh' }}
              variant='standard'
              onChange={pwHandle}
              error={error[2]}
              // 해제 조건 : 1. 아이디 입력(○) 2. 에러(☓)
              disabled={!(form[1] && !error[1])}
            >
              <InputLabel htmlFor='standard-adornment-password'>
                비밀번호 재입력
              </InputLabel>
              <Input
                id='ChangePwValueTwo'
                name='mbr_pw'
                value={form[2]}
                autoComplete='new-password'
                type={showPasswordTwo ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visiobility'
                      onClick={handleClickShowPasswordTwo}
                      onMouseDown={handleMouseDownPassword}
                      tabIndex={-1}
                    >
                      {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {error[2] ? (
                <FormHelperText children={pwConfirm} />
              ) : (
                <FormHelperText children=' ' />
              )}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <BadgeIcon sx={icon} />
            <TextField
              sx={{ width: '100%', marginTop: '-0.75vh' }}
              label='닉네임'
              name='mbr_nickname'
              variant='standard'
              onChange={nickHandle}
              value={form[3]}
              error={error[3]}
              helperText={error[3] ? nickVal : ' '}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <MailOutlineIcon sx={icon} />
                <TextField
                  sx={{ width: '100%' }}
                  label='이메일'
                  name='mbr_email'
                  onChange={emailHandle}
                  variant='standard'
                  value={form[4]}
                  error={error[4]}
                  helperText={error[4] ? emailVal : ' '}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  marginTop: '2.3vh',
                  justifyContent: 'right',
                }}
              >
                <Button
                  size='large'
                  sx={{ width: '90%', fontWeight: 'bold', fontSize }}
                  variant='contained'
                  // 통과 조건 : 1. 체크(○) 2. 모든 에러(☓) 3. 모든 폼 입력(○) 4. 신청중이 아님
                  disabled={
                    !(
                      termsCheck &&
                      !error.includes(true) &&
                      form.every(item => item)
                    )
                  }
                  type='submit'
                >
                  신청
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Signuptab
