import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import { Grid } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { loremIpsum } from 'react-lorem-ipsum'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

const Content = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box>
          <Tabs value={value} onChange={handleChange} variant='fullWidth'>
            <Tab label='회원가입' value='1' />
            <Tab label='비밀번호 찾기' value='2' />
            <Tab label='비밀번호 재설정' value='3' />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value='1'>{signuptab()}</TabPanel>
          <TabPanel value='2'>Item Two</TabPanel>
          <TabPanel value='3'>Item Three</TabPanel>
        </Box>
      </TabContext>
    </Box>
  )
}

const signuptab = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          sx={{ width: '100%' }}
          multiline
          rows={8}
          InputProps={{
            readOnly: true,
            style: { fontSize: '16px' },
          }}
          value={loremIpsum({ p: 10 })}
          variant='filled'
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginTop: '2vh',
        }}
      >
        <FormControlLabel
          value={false}
          control={<Checkbox />}
          label='해당 내용에 동의합니다.'
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PermIdentityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            sx={{ width: '36.6%', marginTop: '1vh' }}
            id='standard-basic'
            label='아이디'
            variant='standard'
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ width: '40%', marginTop: '1vh' }}
          id='standard-basic'
          label='비밀번호'
          variant='standard'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ width: '40%', marginTop: '1vh' }}
          id='standard-basic'
          label='비밀번호 재입력'
          variant='standard'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ width: '40%', marginTop: '1vh' }}
          id='standard-basic'
          label='닉네임'
          variant='standard'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ width: '40%', marginTop: '1vh' }}
          id='standard-basic'
          label='이메일'
          variant='standard'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ width: '40%', marginTop: '1vh' }}
          id='standard-basic'
          label='인증번호'
          variant='standard'
        />
      </Grid>
    </Grid>
  )
}

export default Content
