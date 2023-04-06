import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Footer = () => {
  return (
    <div>
      <AppBar position='static' color='primary'>
        <Toolbar style={{ justifyContent: 'center' }}>
          <Typography style={{ fontWeight: 'bold', fontSize: 'small' }}>
            Board Mamker, created in 2023.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Footer
