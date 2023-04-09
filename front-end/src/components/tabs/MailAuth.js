import Box from '@mui/material/Box'
import { TextField } from '@mui/material'

const MailAuth = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        id='filled-basic'
        label='code'
        variant='outlined'
        name='mbr_cert_number'
        sx={{
          width: '50%',
          marginTop: '20vh',
        }}
      />
    </Box>
  )
}

export default MailAuth
