import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header = () => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h5'>Board Maker</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
