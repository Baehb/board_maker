import * as React from 'react'
import { Grid, Snackbar } from '@material-ui/core'
import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Signuppage from './components/Signuppage'
import Footer from './components/Footer'
import MuiAlert from '@material-ui/lab/Alert'
import backgroundImage from './images/image3.jpg'

const App = () => {
  // 共通. dispatch 선언
  const dispatch = useDispatch()
  // 共通. 응답 메시지 로딩
  const responseMessage = useSelector(state => state.signUp.responseMessage)
  const messageOpen = useSelector(state => state.signUp.messageOpen)
  const theme = useSelector(state => state.signUp.theme)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch({ type: 'ShowToast', payload: false })
  }

  return (
    <Box sx={root}>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid container>
          <Grid item xs={false} sm={2} />
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              height: '0%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Signuppage />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
      {/* 토스트 메시지 */}
      <Snackbar
        open={messageOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={theme}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

// 토스트 메시지 wrapper
const Alert = props => <MuiAlert elevation={6} variant='filled' {...props} />

const root = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export default App
