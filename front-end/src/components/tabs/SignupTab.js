import { useState, useEffect } from 'react'
import { loremIpsum } from 'react-lorem-ipsum'
import { Grid } from '@material-ui/core'

import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import KeyIcon from '@mui/icons-material/Key'
import CheckIcon from '@mui/icons-material/Check'
import BadgeIcon from '@mui/icons-material/Badge'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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
} from '@mui/material'

const Signuptab = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // 체크박스
  const [termsCheck, setTermsCheck] = useState(false)
  const handleCheckboxChange = event => {
    setTermsCheck(event.target.checked)
  }

  // 에러 유무
  const [error, setError] = useState(false)

  // 통과 유무
  const [ok, setOk] = useState(true)

  // 아이디
  const [idValue, setIdValue] = useState('')

  // 최초 입력 감지
  const [inputSwitch, setInputSwitch] = useState(false)

  const idHandle = event => {
    setIdValue(event.target.value)
    // 정규식 검사
    const result = /^(?=.*[A-Za-z])[A-Za-z][A-Za-z0-9]{3,11}$/.test(
      event.target.value
    )
    setOk(!result)
    setError(!result)
    setInputSwitch(true)
  }

  // 비밀번호
  const [pass, setPass] = useState(['', ''])
  // const [passwordMatching, setpasswordMatching] = useState(false)

  const pwHandle = event => {
    if (event.target.id === 'password') {
      setPass(prevPass => [event.target.value, prevPass[1]])
    }

    if (event.target.id === 'passwordConfirm') {
      setPass(prevPass => [prevPass[0], event.target.value])
    }

    // console.log(passwordMatching)
  }
  useEffect(() => {
    console.log(pass) // 업데이트된 pass를 콘솔에 출력합니다.
  }, [pass])

  return (
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
          label='해당 내용에 동의합니다.'
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PermIdentityIcon
            sx={{
              color: 'action.active',
              mr: 1,
              my: 0.5,
              // 에러 발생시, 아이콘 부동 대응
              marginBottom: {
                xs: error ? '2.75vh' : '0vh',
                md: error ? '2.75vh' : '0vh',
              },
            }}
          />
          <TextField
            sx={{ width: '100%', marginTop: '3vh' }}
            label='아이디'
            variant='standard'
            value={idValue}
            required
            onChange={idHandle}
            error={error}
            // 최초 helperText를 비표시한다.
            helperText={
              ok
                ? inputSwitch
                  ? '소문자로 시작해야 하고, 숫자를 조합할 수 있습니다. (4~12자)'
                  : ''
                : ''
            }
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {/* 비밀번호 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <FormControl
            sx={{ width: '100%', marginTop: '1vh' }}
            variant='standard'
            value={pass[0]}
            onChange={pwHandle}
            required
          >
            <InputLabel htmlFor='standard-adornment-password'>
              비밀번호
            </InputLabel>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CheckIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <FormControl
            sx={{ width: '100%', marginTop: '1vh' }}
            variant='standard'
            value={pass[1]}
            onChange={pwHandle}
            required
          >
            <InputLabel htmlFor='standard-adornment-password'>
              비밀번호 재입력
            </InputLabel>
            <Input
              id='passwordConfirm'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            sx={{ width: '100%', marginTop: '1vh' }}
            label='닉네임'
            required
            variant='standard'
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <MailOutlineIcon
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
              />
              <TextField
                sx={{ width: '100%', marginTop: '1vh' }}
                label='이메일'
                required
                variant='standard'
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
                sx={{ width: '80%', fontWeight: 'bold', fontSize: fontSize }}
                variant='contained'
                // 1. 체크됨 2. id통과 3. 패스워드 매칭
                disabled={!(termsCheck === true && ok === false)}
              >
                인증발송
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

// 유동적 버튼 폰트 사이즈
const fontSize = {
  xs: '9px',
  md: '15px',
}

export default Signuptab
