import { TabContext, TabPanel } from '@mui/lab'
import SignupTab from './tabs/SignupTab.js'
import MailAuth from './tabs/MailAuth.js'
import { Box, Tab, Tabs } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const Content = () => {
  const dispatch = useDispatch()
  const value = useSelector(state => state.signUp.tab)
  const tabChange = (event, newValue) => {
    dispatch({ type: 'ChangeTab', payload: newValue })
  }

  return (
    <Box sx={{ width: '100%', height: { md: '95vh', xs: '108vh' } }}>
      <TabContext value={value}>
        <Box>
          <Tabs
            value={value}
            onChange={tabChange}
            textColor='primary'
            indicatorColor='primary'
            variant='fullWidth'
            sx={{
              '& .MuiTab-root': {
                fontSize: { md: 'x-large', xs: 'medium' },
                fontWeight: 'bold',
              },
            }}
          >
            <Tab label='회원가입' value='1' />
            <Tab label='메일인증' value='2' />
            <Tab label='암호 찾기' value='3' />
            <Tab label='암호 재설정 ' value='4' />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value='1'>
            <SignupTab />
          </TabPanel>
          <TabPanel value='2'>
            <MailAuth />
          </TabPanel>
          <TabPanel value='3'></TabPanel>
          <TabPanel value='4'></TabPanel>
        </Box>
      </TabContext>
    </Box>
  )
}

export default Content